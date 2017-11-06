// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define({"widgets/NearMe/setting/nls/strings":{units:{miles:{displayText:"Mile",acronym:"mi"},kilometers:{displayText:"Kilometry",acronym:"km"},feet:{displayText:"Stopy",acronym:"ft"},meters:{displayText:"Metry",acronym:"m"}},searchSetting:{searchSettingTabTitle:"Ustawienia wyszukiwania",defaultBufferDistanceLabel:"Ustaw domy\u015bln\u0105 odleg\u0142o\u015b\u0107 buforowania",maxBufferDistanceLabel:"Ustaw maksymaln\u0105 odleg\u0142o\u015b\u0107 buforowania",bufferDistanceUnitLabel:"Jednostki odleg\u0142o\u015bci buforowania",
defaultBufferHintLabel:"Wskaz\u00f3wka: ustaw warto\u015b\u0107 domy\u015bln\u0105 dla suwaka bufora",maxBufferHintLabel:"Wskaz\u00f3wka: ustaw warto\u015b\u0107 maksymaln\u0105 dla suwaka bufora",bufferUnitLabel:"Wskaz\u00f3wka: zdefiniuj jednostk\u0119 na potrzeby tworzenia bufora",selectGraphicLocationSymbol:"Adres lub symbol lokalizacji",graphicLocationSymbolHintText:"Wskaz\u00f3wka: symbol wyszukiwanego adresu lub klikni\u0119ta lokalizacja",fontColorLabel:"Wybierz kolor czcionki dla wynik\u00f3w wyszukiwania",
fontColorHintText:"Wskaz\u00f3wka: kolor czcionki dla wynik\u00f3w wyszukiwania",zoomToSelectedFeature:"Powi\u0119ksz do wybranego obiektu",zoomToSelectedFeatureHintText:"Wskaz\u00f3wka: powi\u0119ksz do wybranego obiektu zamiast do bufora",intersectSearchLocation:"Zwr\u00f3\u0107 przecinaj\u0105ce si\u0119 poligony",intersectSearchLocationHintText:"Wskaz\u00f3wka: zwraca poligony zawieraj\u0105ce szukan\u0105 lokalizacj\u0119, a nie poligony w zasi\u0119gu bufora",bufferVisibilityLabel:"Ustaw widoczno\u015b\u0107 bufora",
bufferVisibilityHintText:"Wskaz\u00f3wka: bufor zostanie wy\u015bwietlony na mapie",bufferColorLabel:"Ustaw symbol bufora",bufferColorHintText:"Wskaz\u00f3wka: wybierz kolor i przezroczysto\u015b\u0107 bufora",searchLayerResultLabel:"Wy\u015bwietl tylko wybran\u0105 warstw\u0119 wynik\u00f3w",searchLayerResultHint:"Wskaz\u00f3wka: na mapie zostanie wy\u015bwietlona tylko warstwa wybrana w wynikach wyszukiwania"},layerSelector:{selectLayerLabel:"Wybierz warstwy wyszukiwania",layerSelectionHint:"Wskaz\u00f3wka: u\u017cyj przycisku ustawiania, aby wybra\u0107 warstwy",
addLayerButton:"Ustaw"},routeSetting:{routeSettingTabTitle:"Ustawienia wskaz\u00f3wek dojazdu",routeServiceUrl:"Us\u0142uga wyznaczania trasy",buttonSet:"Ustaw",routeServiceUrlHintText:"Wskaz\u00f3wka: kliknij przycisk Ustaw, aby wybra\u0107 us\u0142ug\u0119 wyznaczania trasy",directionLengthUnit:"Jednostki d\u0142ugo\u015bci u\u017cywane wskaz\u00f3wek dojazdu",unitsForRouteHintText:"Wskaz\u00f3wka: s\u0142u\u017cy do wy\u015bwietlania jednostek u\u017cywanych dla wyznaczonej trasy",selectRouteSymbol:"Wybierz symbol, aby wy\u015bwietli\u0107 tras\u0119",
routeSymbolHintText:"Wskaz\u00f3wka: s\u0142u\u017cy do wy\u015bwietlania symbolu liniowego trasy",routingDisabledMsg:"Aby w\u0142\u0105czy\u0107 wskaz\u00f3wki dojazdu, w\u0142\u0105cz trasowanie (routing) w elemencie us\u0142ugi ArcGIS Online."},networkServiceChooser:{arcgislabel:"Dodaj z us\u0142ugi ArcGIS Online",serviceURLabel:"Dodaj adres URL us\u0142ugi",routeURL:"Adres URL trasy",validateRouteURL:"Sprawd\u017a poprawno\u015b\u0107",exampleText:"Przyk\u0142ad",hintRouteURL1:"https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/",
hintRouteURL2:"https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",invalidRouteServiceURL:"Podaj prawid\u0142ow\u0105 us\u0142ug\u0119 wyznaczania tras.",rateLimitExceeded:"Przekroczono limit szybko\u015bci. Spr\u00f3buj ponownie p\u00f3\u017aniej.",errorInvokingService:"Nazwa u\u017cytkownika lub has\u0142o jest nieprawid\u0142owe."},errorStrings:{bufferErrorString:"Wpisz prawid\u0142ow\u0105 warto\u015b\u0107 numeryczn\u0105.",selectLayerErrorString:"Wybierz warstwy do wyszukiwania.",
invalidDefaultValue:"Domy\u015blna odleg\u0142o\u015b\u0107 buforowania nie mo\u017ce by\u0107 pusta. Podaj odleg\u0142o\u015b\u0107 buforowania",invalidMaximumValue:"Maksymalna odleg\u0142o\u015b\u0107 buforowania nie mo\u017ce by\u0107 pusta. Podaj odleg\u0142o\u015b\u0107 buforowania",defaultValueLessThanMax:"Podaj domy\u015bln\u0105 odleg\u0142o\u015b\u0107 buforowania w ramach limitu",defaultBufferValueGreaterThanZero:"Okre\u015bl domy\u015bln\u0105 odleg\u0142o\u015b\u0107 buforowania wi\u0119ksz\u0105 ni\u017c 0",
maximumBufferValueGreaterThanZero:"Okre\u015bl maksymaln\u0105 odleg\u0142o\u015b\u0107 buforowania wi\u0119ksz\u0105 ni\u017c 0"},symbolPickerPreviewText:"Zobacz podgl\u0105d:",_localized:{}}});