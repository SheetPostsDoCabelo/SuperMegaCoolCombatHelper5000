 
 const party = [
     {
         name: 'Bamvros',
         title: 'A pedra dos Monstros',
         imgsrc:'https://i.pinimg.com/originals/5b/40/0f/5b400f2fe66be3f3c739779edbac053c.jpg',
         CA: 17
     },
     {
        name: 'Borivik',
        title: 'Artista da Guerra',
        imgsrc:'./public/assets/borivik.PNG',
        CA: 19
    },
    {
        name: 'Dante',
        title: 'Samurai Exorcista',
        imgsrc:'./public/assets/Casual1 - Copia.jpg',
        CA: 24

    },
    {
        name: "Rag'Oth'Er",
        title: 'O Rei Mestiço',
        imgsrc:'https://64.media.tumblr.com/c61fd71c7591a7ec1c0793c77a6dfedf/tumblr_nmac1xgLYu1sncm04o1_1280.png',
        CA: 16
    },
    {
        name: 'Alastair',
        title: 'Livre Desbravador',
        imgsrc:'https://i.pinimg.com/originals/cc/fd/13/ccfd133e7513d57992c719a319de88af.jpg',
        CA: 17
    }
 ]
 
const attack1Name = "Slashes"
const attack1 = 6

const attack2Name = "Bolts"
const attack2 = 6


onload = function () {
    for(i=0;i<party.length;i++){

 $('#body').append(
     `
     <div class="container-fluid characterCard ml-0 mt-1 d-flex flex-row align-items-center">
     <div class="row ">
         <div class="col-12 mt-3 fixCardSize">
             <div class="card mt-0 shadow">
                 <div class="card-horizontal align-items-center">
                     <div class="img-square-wrapper d-flex align-items-center imgCharacter">
                         <img 
                              class="img-fluid; border-0;"
                              src="${party[i].imgsrc}"
                              alt="Card image cap">
                     </div>
                     <div class="card-body pt-0 pb-0">
                         <h4 class="card-title">${party[i].name}</h4>
                         <p class="card-text">${party[i].title}</p>
                     </div>
                         <div class="d-flex align-items-center">
                             <div class="d-flex align-items-center">
                                  <div class="d-flex flex-column align-items-center pb-3">
                                     <small class="typeOfHit">${attack1Name}</small>
                                          <div>
                                              <input type="checkbox" class="advantage" onclick="toggleCheck(this)">
                                              <input type="checkbox" class="disadvantage mb-1" onclick="toggleCheck(this)">
                                         </div>
                                     <input type="number" max="19" min="0" class="counterAttacks">   
                                     <small></small>
                                 </div>
                                 <div class="d-flex flex-column align-items-center pb-3">
                                     <small class="typeOfHit">${attack2Name}</small>
                                         <div>
                                             <input type="checkbox" class="advantage" onclick="toggleCheck(this)">
                                             <input type="checkbox" class="disadvantage mb-1" onclick="toggleCheck(this)">
                                         </div>
                                     <input type="number" max="19" min="0" class="counterAttacks">   
                                     <small></small>
                                 </div>
                             </div>
                         </div>                   
                     <button type="button" class="btn btn-danger mr-3 ml-2" onclick="calculateAttacks(this)">Roll</button>
                 </div>
             </div>
         </div>
     </div>
 </div>
     `
 )
 
    }
}

const Reload = () => {location.reload()}
