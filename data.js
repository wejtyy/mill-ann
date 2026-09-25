// MILL-ANN – data webu
// TADY můžeš později jednoduše měnit jezdce, týmy, statistiky, novinky a vítěze.
// Fotky jezdců jsou uložené v assets/drivers/.

const DRIVERS = [
  {id:"driver-wejty", name:"Wejty", team:"Mercedes-AMG", country:"CZ", photo:"assets/drivers/wejty.png", stats:{wins:13,podiums:42,points:1022,races:96}},
  {id:"driver-garik", name:"Garik", team:"Scuderia Ferrari", country:"CZ", photo:"assets/drivers/garik.png", stats:{wins:23,podiums:40,points:1080,races:95}},
  {id:"driver-sirasek", name:"Sirasek", team:"Haas", country:"CZ", photo:"assets/drivers/sirasek.png", stats:{wins:12,podiums:36,points:911,races:96}},
  {id:"driver-johny", name:"Johny", team:"Red Bull Racing", country:"CZ", photo:"assets/drivers/johny.png", stats:{wins:14,podiums:36,points:837,races:96}},
  {id:"driver-lukas", name:"Lukáš", team:"Aston Martin", country:"CZ", photo:"assets/drivers/lukas.png", stats:{wins:1,podiums:3,points:85,races:24}},
  {id:"driver-pisky", name:"Piškotek", team:"Audi", country:"CZ", photo:"assets/drivers/pisky.png", stats:{wins:0,podiums:0,points:0,races:0}},
  {id:"driver-david", name:"David", team:"McLaren", country:"CZ", photo:"assets/drivers/david.png", stats:{wins:6,podiums:10,points:269,races:24}},
  {id:"driver-zahry", name:"Zahry", team:"Mercedes-AMG", country:"CZ", photo:"assets/drivers/zahry.png", stats:{wins:1,podiums:2,points:66,races:17}},
  {id:"driver-takencz", name:"TakenCZ", team:"Doplň tým", country:"CZ", photo:"assets/drivers/taken.png", stats:{wins:0,podiums:0,points:0,races:6}}
];

const WINNERS = [
  {event:"Mill-Ann #1",driver:"Garik",note:"Vítěz prvního Mill-Ann turnaje."},
  {event:"Mill-Ann #2",driver:"Garik",note:"Vítěz druhého Mill-Ann turnaje."},
  {event:"Mill-Ann #3",driver:"Sirasek",note:"Vítěz třetího Mill-Ann turnaje."},
  {event:"Mill-Ann #4",driver:"Wejty",note:"Vítěz čtvrtého Mill-Ann turnaje."},
  {event:"Mill-Ann #5",driver:"Garik",note:"Vítěz pátého Mill-Ann turnaje."},
  {event:"Mill-Ann #6",driver:"David",note:"Vítěz šestého Mill-Ann turnaje."}
];

const NEWS = [
  {date:"MILL-ANN",title:"Vítej na oficiálním webu",text:"Tady budou postupně přibývat novinky, oznámení a informace o Mill-Ann.",image:""},
  {date:"STATISTIKY",title:"Aktuální pořadí jezdců",text:"Celkové pořadí je sestavené podle bodů evidovaných napříč odehranými závody.",image:""}
];

const GALLERY = [];
