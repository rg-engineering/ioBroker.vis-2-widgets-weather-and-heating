import type { VisRxWidgetState } from '@iobroker/types-vis-2';
import type VisRxWidget from '@iobroker/types-vis-2/visRxWidget';

export default class Generic<
    RxData extends Record<string, any>,
    State extends Partial<VisRxWidgetState> = VisRxWidgetState,
> extends (window.visRxWidget as typeof VisRxWidget)<RxData, State> {
    getPropertyValue = (stateName: string): any => this.state.values[`${(this.state.rxData as any)[stateName]}.val`];

    static getI18nPrefix(): string {
        return 'vis_2_widgets_weather_heating_label_';
    }

    async getParentObject(id: string): Promise<ioBroker.Object | null> {
        const parts = id.split('.');
        parts.pop();
        const parentOID = parts.join('.');
        return await this.props.context.socket.getObject(parentOID);
    }
}




