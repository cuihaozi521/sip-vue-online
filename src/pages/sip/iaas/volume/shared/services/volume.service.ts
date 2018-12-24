import { SipHttpSqlDef, SipHttpSqlDefFunction, SipInjectable, SipService } from '@libs/sip';
import { VolumeModel } from '../models/volume.model';

@SipInjectable({ scope: 'business' })
export class VolumeService extends SipService {

    @SipHttpSqlDef<VolumeModel[]>({
        sqlId: 'Iaas_Volume.List.GetByOwnerID',
        connstr: 'iaas',
        sqlType: 'PageList'
    })
    pageList: SipHttpSqlDefFunction<{
        Content?: string;
        RegionID?: string;
        projectId?: string;
        elStatus?: string;
        tag?: string;
        isRoot?: string;
        Volumn_ID?: string;
        InstanceID?: string;
        Volumn_Status?: string;
        Volumn_StatusNotIn?: string;
        BizStatus?: string;
    }, VolumeModel[]>;

}

