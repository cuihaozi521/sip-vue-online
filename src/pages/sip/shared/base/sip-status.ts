import _ from "lodash";

export interface SipStatuItem {
    text: string;
    value?: string;
    className: string;
}

export interface SipStatuExtend {
    $toList: () => SipStatuItem[];
    $text: (value: string) => string;
    $className: (value: string) => string;
    $prop: (key: string, value: string) => any;
    $toTableFilters:()=> {
        label: string;
        value: string | number | boolean;
    }[];
}

export interface SipStatuParams {
    [value: string]: SipStatuItem;
}

export type SipStatus<T> = T & SipStatuExtend;

export function SipCreateStatus<T extends SipStatuParams>(params: T): SipStatus<T> {
    let extend: SipStatuExtend = {
        $toList() {
            let list = [];
            _.each(params as any, function (item, key) {
                item.value = key;
                list.push(item);
            });
            return list;
        },
        $text(value: string): string {
            return status.$prop('text', value);
        },
        $className(value: string): string {
            return status.$prop('className', value);
        },
        $prop(key: string, value: string): any {
            let o: SipStatuItem = status[value];
            return o ? o[key] : null;
        },
        $toTableFilters(){
            let filters = _.map(status.$toList(), function(item){
                return {
                    label:item.text,
                    value:item.value
                };
            });
            return filters;
        }
    };
    let status = Object.assign({}, params, extend);
    return status;
}
