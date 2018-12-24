import { SipHttpDef, SipHttpDefFunction, SipPreload, SipService } from "@libs/sip";
import _ from "lodash";
import { RegionModel } from "../models/region.model";

export class RegionService extends SipService {

    regionList: RegionModel[];

    tableFilterList() {
        return _.map(this.regionList, function (item) {
            return {
                label: item.regionName,
                value: item.regionId
            };
        });
    }

    @SipPreload()
    private load() {
        return this.list().then((rs) => {
            this.regionList = rs.isSucc && rs.data ? rs.data : [];
        });
    }

    @SipHttpDef({
        defMethod: 'get',
        url: 'api/basicData/describeRegions',
        cache: false,
        conflictKey: 'tsetaa'
    })
    list: SipHttpDefFunction<RegionModel, RegionModel[]>;

    getRegion(regionId): RegionModel {
        return _.find(this.regionList, 'regionId')
    }

    getName(regionId: string) {
        let region = this.getRegion(regionId);
        return region ? region.regionName : '';
    }

    isProp(regionId: string, key: string, defaultValue?: boolean): boolean {
        let region = this.getRegion(regionId);
        return region ? region[key] : defaultValue;
    }
}