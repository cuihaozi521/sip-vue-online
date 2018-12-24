import { SipAccessItem, SipInit, SipInject, SipPage, SipReady, SipTableManager, SipVueComponent } from '@libs/sip';
import { RegionService } from '../../region/shared/services/region.service';
import { VolumeStatus } from './shared/base/volume-status';
import { VolumeModel } from './shared/models/volume.model';
import { VolumeService } from './shared/services/volume.service';
import { VolumeSharedMixin } from './shared/volume-shared.mixin';

@SipVueComponent({
    mixins: [VolumeSharedMixin]
})
export default class VolumeList extends SipPage {

    @SipInit()
    private init() {
        // this.$logger.debug('init', this);
        this.$accessManager.datas = [];
    }

    @SipInject(RegionService)
    regionSrv:RegionService;

    status = VolumeStatus;

    @SipInject(VolumeService)
    volumeSrv: VolumeService;

    //#region table

    searchInput(value) {
        this.tableManager.search({ content: value });
    }

    tableManager: SipTableManager<VolumeModel> = new SipTableManager();

    @SipReady()
    private _initTable() {
        console.log('_initTable')
        this.tableManager = new SipTableManager<VolumeModel>({
            rest: (params, option) => {
                if (params.Volumn_Status == 'active') {
                    params.Volumn_StatusNotIn = "deleting,deleted";
                    params.Volumn_Status = '';
                } else {
                    params.Volumn_StatusNotIn = '';
                }
                return this.volumeSrv.pageList(params, option);
            },
            columns: [{
                title: "编号",
                key: "Volumn_Code",
                width: 150,
                sortable: true
            },
            {
                title: "存储",
                key: "Title",
                // width: 150,
                sortable: true
            },
            {
                title: "创建时间",
                key: "Create_Time",
                width: 150,
                sortType: 'desc',
                sortable: true,
                tooltip: true
            },
            {
                title: "区域",
                key: "REGION_ID",
                width: 150,
                sortable: true,
                filters: this.regionSrv.tableFilterList(),
                onFilter: (values) => {
                    return {
                        RegionID: values.join(',')
                    };
                }
            },
            {
                title: "状态",
                key: "Volumn_Status",
                width: 150,
                sortable: true,
                // sortType: 'desc',
                filteredValue: ['active'],
                filters: this.status.$toTableFilters()
            }],
            contextmenu: () => {
                return [{
                    name: '挂接实例',
                    disabled: !this.$accessManager.isAccess('bindToInstance'),
                    click: (item) => {
                        this.bindToInstance();
                    }
                }, {
                    name: '删除存储',
                    disabled: !this.$accessManager.isAccess('bindToInstance'),
                    divided: true,
                    click: (item) => {
                        this.detachVolume();
                    }
                }]
            }
        });
        this.tableManager.onSelectChanged((datas) => {
            this.$accessManager.datas = datas;
        });

    }

    //#endregion table

    //#region tags

    tags = [
        {
            name: "拉面",
            key: "lamian"
        },
        {
            name: "拉面2",
            key: "lamian2",
            children: [{ name: "a", key: "1" }, { name: "b", key: "2" }]
        }
    ];
    tagsList = [];

    changeTagsMenu(name) {
        this.tagsList.push(name);
    }
    handleClose(index) {
        this.tagsList.splice(index, 1);
    }

    //#endregion tags


    @SipAccessItem('create', {
        hasData: false
    })
    create() {
        this.$logger.debug('create');
        this.$open('/sip/UIDemo/form').receive((r) => {
            if (!r) return;
        });
    }

    @SipAccessItem('bindToInstance', {
        hasData: true, multi: false
    })
    bindToInstance() {
        this.$logger.debug('bindToInstance', this.tableManager.getSelectFirst());
    }

    @SipAccessItem('detachVolume', {
        hasData: true, multi: false
    })
    detachVolume() {
        this.$logger.debug('detachVolume', this.tableManager.getSelectFirst());
    }

    @SipAccessItem('detail', {
        hasData: true, multi: false
    })
    detail() {
        let data = this.tableManager.getSelectFirst();
        if (!data) return;
        this.$open('/sip/UIDemo/detail', { id: data.Volumn_Code, name: data.Title }).receive((r) => {
            console.log('detail return ', r);
        });
    }

    @SipAccessItem('exportData', {
        hasData: false
    })
    exportData(type) {
        if (type === 1) {
            this.tableManager.exportCsv({
                filename: "The original data"
            });
        } else if (type === 2) {
            this.tableManager.exportCsv({
                filename: "Sorting and filtering data",
                original: false
            });
        } else if (type === 3) {
            // this.tableManager.exportCsv({
            //     filename: "Custom data",
            //     columns: this.columns8.filter((col, index) => index < 4),
            //     data: this.data7.filter((data, index) => index < 4)
            // });
        }
    }
}