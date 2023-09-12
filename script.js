
let vaisseau = document.createElement('img');
let main = document.querySelector('#main');
let loading = document.querySelector('#loading');

const leo = document.querySelector('#leo')
const raph = document.querySelector('#raph')
const mike = document.querySelector('#mike')
const don = document.querySelector('#don')


// -------------------------------- CREATION DU VAISSEAU ------------------------------------

let numerovaisseau

if(leo){
  vaisseau.src = "leo.gif";
  numerovaisseau = 1
} else if (raph){
  vaisseau.src = "raph.gif"
  numerovaisseau = 2
} else if (mike) {
  vaisseau.src = "mike.gif"
  numerovaisseau = 3
} else if(don){
  vaisseau.src = "leo.gif"
  numerovaisseau = 4
}

vaisseau.style.zIndex = "1000"
vaisseau.style.width = '110px'
vaisseau.style.height = '110px'
vaisseau.style.position = "absolute"
vaisseau.style.top = "800px"
vaisseau.style.left = "900px"

main.appendChild(vaisseau);


// -------------------------------- FONCTION POUR DEPLACER VAISSEAU ------------------------------------

document.addEventListener("keydown", function(event) {
    if (event.code == 'ArrowLeft') {
        let vaisseauLeft = parseInt(vaisseau.style.left)        
        //console.log(vaisseauLeft)
        vaisseauLeft = vaisseauLeft - 18
        vaisseau.style.left = vaisseauLeft + "px"}});
    

        document.addEventListener("keydown", function(event) {
            if (event.code == 'ArrowRight') {
                let vaisseauRight = parseInt(vaisseau.style.left)        
                //console.log(vaisseauRight)
                vaisseauRight = vaisseauRight + 18
                vaisseau.style.left = vaisseauRight + "px"
                    }});


//-------------------------------- LIMITER LE VAISSEAU DANS L'ECRAN ------------------------------------

// Obtenez les dimensions de l'écran et de l'élément en creant des constantes
const largeurEcran = window.innerWidth;
const largeurVaisseau = vaisseau.offsetWidth;

document.addEventListener('keydown', (event) => {
    
// Obtenez les coordonnées actuelles du vaisseau
let x = parseInt(vaisseau.style.left) || 0; 

// Vérifiez et ajustez si le vaisseau dépasse les limites de l'écran
x = Math.max(0, Math.min(x, largeurEcran - largeurVaisseau));
   
// Mettez à jour les coordonnées du vaisseau
vaisseau.style.left = x + 'px';
    
});

//-------------------------------- CREATION DES MISSILES ------------------------------------

 document.addEventListener("keydown", function(event) {

    if (event.code == 'Space') {
        let missile = document.createElement('img')      
        main.appendChild(missile)

       // console.log(vaisseau.style.left, vaisseau.style.top)

        missile.src = "missile.gif"
        missile.style.position = "absolute"
        missile.style.top = vaisseau.style.top //La on dit au missile qu'il a la meme valeur y de depart que le vaisseau
        missile.style.left = vaisseau.style.left 
        missile.style.zIndex = "1000"
        missile.style.width = '50px'
        missile.style.height = '50px'

// -------------------------------- FONCTION DEPLACEMENT MISSILE ------------------------------------

function moveDiv() {

let posX = parseInt(missile.style.top); // Position horizontale initiale traduite en ParseInt
  const speed = 8; // constante Vitesse de déplacement
  posX -= speed;   
  //console.log(posX)
  
  missile.style.top = posX + "px"

  // -------------------------------- DETECTION DE COLLISION ET SUPPRESSION SHREDDER ET MISSILE ------------------------------------

  let shredderAll = document.querySelectorAll(".ennemis") // On cree une valeur SHredderAll, qui va chercher tous les shredder
  
   //On cree un for
  for(i=0; i<shredderAll.length; i++){
    let shredder = shredderAll[i] //Ici on cible chaque shredder dans le for

    /*if pour la collision, on remplace l'image du shredder par l'explosion, et on remove le missile,
    puis le shredder à la fin */
    if (checkCollision(shredder, missile)){
      shredder.src = "Explosion.png"
      missile.remove()
      clearInterval(missileMove) // clear interval pour arrêter le movement du missile sinon c'est infini
      setTimeout(function() { // setTimeout sert a mettre un delay avant de faire l'action de remove shredder, ici 0.5s
        shredder.remove()
      },500)
    }  
  }

   // -------------------------------- DETECTION DE COLLISION ET SUPPRESSION KRANG ET MISSILE ------------------------------------

  let krangAll = document.querySelectorAll(".ennemies2") // On cree une valeur SHredderAll, qui va chercher tous les shredder
  
  for(i=0; i<krangAll.length; i++){
    let krang = krangAll[i] 

    if (checkCollision(krang, missile)){
      krang.src = "Explosion.png"
      missile.remove()
      clearInterval(missileMove) 
      setTimeout(function() {
        krang.remove()
      },500)
    }  
  }
}

let missileMove = setInterval(moveDiv, 20); //intervale pour le movement du missile
}})


//---------------------------------------CREATION DES SHREDDERS -----------------------------------------

// On fait une fonction, qu'on apelle createEnnemies
let createEnnemies1 = function () {

  // On fait une boucle, pour 7 ennemis, ou on cree une div pour 1 seul shredder, qui va se repeter 7 fois.
  for (i=0; i<8; i++){
    let shredder = document.createElement('img');
    shredder.src = "shredder.gif"

    shredder.style.zIndex = "1000"
    shredder.style.width = '120px'
    shredder.style.height = '120px'
    shredder.style.position = "absolute"
    shredder.style.top = "-200px"
    shredder.style.left = i * 250 +"px" // ici la position est determinée par le num de shredder (i) x 250 + px
    shredder.className = "ennemis"

    main.appendChild(shredder);
  }
}

createEnnemies1()

//---------------------------------------MOVEMENT DES SHREDDERS -----------------------------------------

function moveShredder() {
  let shredderAll = document.querySelectorAll(".ennemis")

 if(shredderAll.length < 1 ) { 
    if(numerovaisseau == 3){
    vaisseau.src == "Mikewin.gif"
  } else if (numerovaisseau == 1){
    vaisseau.src == "Leowin.gif"
    } else if (numerovaisseau == 2){
      vaisseau.src == "Raphwin.gif"
    }} else if (numerovaisseau == 4){
      vaisseau.src == "Donwin.gif"
    }

  // On fait un tableau, avec le queryselector, qui renvoie a la classe de chacuns de nos shredders (.ennemis)

  for(i=0; i<shredderAll.length; i++){ //shredderAll.lenght renvoie au nombre de shredders créés
    let shredder = shredderAll[i]
    let posX = parseInt(shredder.style.top); // Position horizontale initiale traduite en ParseInt
    const speed = 3; // constante Vitesse de déplacement
    posX += speed;  
    //console.log(posX)
    shredder.style.top = posX + "px"

    
windowHeight = parseInt(window.innerHeight)
if (posX + parseInt(shredder.style.height) > windowHeight){
  clearInterval(moveEnnemies)
  main.removeChild(shredder)
}


  }    
}
let moveEnnemies = setInterval(moveShredder, 200) //on cree la variable pour les faire se deplacer toutes les 0.2s




//---------------------------------------CREATION DES KRANG -----------------------------------------

let createEnnemies2 = function () {
 
  for (i=0; i<6; i++){
    let krang = document.createElement('img');
    krang.src = "krang.gif"

    krang.style.zIndex = "1000"
    krang.style.width = '120px'
    krang.style.height = '120px'
    krang.style.position = "absolute"
    krang.style.top = "-100px"
    krang.style.left = i * 350 +"px"
    krang.className = "ennemies2"

    main.appendChild(krang);
  }
}

createEnnemies2()

//---------------------------------------MOVEMENT DES KRANG -----------------------------------------

function moveKrang() {
  let krangAll = document.querySelectorAll(".ennemies2")


    for(i=0; i<krangAll.length; i++){
    let krang = krangAll[i]
    let posX = parseInt(krang.style.top); 
    const speed = 5;
    posX += speed;  
    //console.log(posX)
    krang.style.top = posX + "px"

    
    windowHeight = parseInt(window.innerHeight)
    if (posX + parseInt(krang.style.height) > windowHeight){
      clearInterval(moveEnnemies2)
      main.removeChild(krang)
    }
  }    
}
let moveEnnemies2 = setInterval(moveKrang, 200)


//---------------------------------------FONCTION POUR LES COLLISIONS -----------------------------------------

function checkCollision(shredder, missile) {
  const rect1 = shredder.getBoundingClientRect();
  const rect2 = missile.getBoundingClientRect();

    return (
    rect1.left < rect2.right &&
    rect1.right > rect2.left &&
    rect1.top < rect2.bottom &&
    rect1.bottom > rect2.top
  );
}

function checkCollision2(krang, missile) {
  const rect3 = krang.getBoundingClientRect();
  const rect4 = missile.getBoundingClientRect();

    return (
    rect3.left < rect4.right &&
    rect3.right > rect4.left &&
    rect3.top < rect4.bottom &&
    rect3.bottom > rect4.top
  );
}


//---------------------------------------CREATION MISSILES ENNEMIS -----------------------------------------

let enemyShoot = setInterval(function() {
  let shredderAll = document.querySelectorAll(".ennemis")
  let nombreAleatoire = Math.floor(Math.random() * 7)
  let ennemiAleatoire = shredderAll[nombreAleatoire]
  //console.log(ennemiAleatoire)

  let missileEnnemi = document.createElement('img')      
  main.appendChild(missileEnnemi)

if(ennemiAleatoire){
  missileEnnemi.src = "shuriken.gif"
  missileEnnemi.style.position = "absolute"
  missileEnnemi.style.top = ennemiAleatoire.style.top
  missileEnnemi.style.left = ennemiAleatoire.style.left 
  missileEnnemi.style.zIndex = "1000"
  missileEnnemi.style.width = '90px'
  missileEnnemi.style.height = '90px'
}

  function moveMiss() {

    let posX = parseInt(missileEnnemi.style.top);
      const speed = 7;
      posX += speed; 
      
      //console.log(posX)
      
      missileEnnemi.style.top = posX + "px"

      windowHeight = parseInt(window.innerHeight)
      //console.log(windowHeight)
      if (posX + parseInt(missileEnnemi.style.height) > windowHeight){
        clearInterval(missileMoveEnnemi)
        main.removeChild(missileEnnemi)
      }

      
 // -- Collision vaisseau ????


 function checkCollision3(vaisseau, shuriken) {
  const rect5 = vaisseau.getBoundingClientRect();
  const rect6 = shuriken.getBoundingClientRect();

    return (
    rect5.left < rect6.right &&
    rect5.right > rect6.left &&
    rect5.top < rect6.bottom &&
    rect5.bottom > rect6.top
  );
}

if (checkCollision3(missileEnnemi, vaisseau)){
console.log(vaisseau)
  vaisseau.src = "babyturtle.gif"
  vaisseau.style.height = "70px"

  // Game over

  let gameover = document.createElement('img');
  gameover.src = "gameover.gif"
  gameover.className = "gameover"
  gameover.style.height = "650px"
  gameover.style.width = "1100px"
  gameover.style.zIndex = "100000"
  gameover.style.position = "absolute"
  gameover.style.top = "17%"
  gameover.style.left = "21%"

  main.appendChild(gameover)
  missileEnnemi.remove()
  clearInterval(missileMoveEnnemi)
  setTimeout(function() {
    vaisseau.remove() 
gameover.remove
window.location = ""
    loading.style.display = "block"
    main.style.display = "none"
  },2800)
} 
  }  
  
  let missileMoveEnnemi = setInterval(moveMiss, 20);
},1500)


// ------------------------------------SELECTION DU HERO-----------------------------------------------




leo.addEventListener('click', function() {
  loading.style.display = "none"
  main.style.display = "block"
  vaisseau.src = 'leo.gif'
})

raph.addEventListener('click', function() {
  loading.style.display = "none"
  main.style.display = "block"
  vaisseau.src = 'raph.gif'
})

mike.addEventListener('click', function() {
  loading.style.display = "none"
  main.style.display = "block"
  vaisseau.src = 'mike.gif'
})

don.addEventListener('click', function() {
  loading.style.display = "none"
  main.style.display = "block"
  vaisseau.src = 'don.gif'
})



// ------------------------------------GAME OVER-----------------------------------------------

