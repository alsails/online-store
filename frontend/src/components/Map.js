import {YMaps, Map, Placemark} from '@pbe/react-yandex-maps';
import styles from "../styles/maps.module.scss"

function Maps() {
    return (
        <YMaps>
            <Map
                className={styles.map}
                defaultState={{
                    center: [55.75, 37.57],
                    zoom: 10,
                    controls: ["zoomControl", "fullscreenControl"],
                }}
                modules={["control.ZoomControl", "control.FullscreenControl"]}
            >
                <Placemark
                    modules={["geoObject.addon.balloon"]}
                    defaultGeometry={[55.859261, 37.395028]}
                    properties={{
                        balloonContentBody:
                            'Круглосуточный магазин в ТЦ "ВЭЙПАРК"',
                    }}
                />
                <Placemark
                    modules={["geoObject.addon.balloon"]}
                    defaultGeometry={[55.655098, 37.829670]}
                    properties={{
                        balloonContentBody:
                            'Магазин на рынке "Садовод"',
                    }}
                />
                <Placemark
                    modules={["geoObject.addon.balloon"]}
                    defaultGeometry={[55.609690, 40.670612]}
                    properties={{
                        balloonContentBody:
                            'Магазин в городе Гусь-Хрустальный на стекольном рынке',
                    }}
                />
            </Map>
        </YMaps>
    );
};

export default Maps;