
let currentChar = ""
let currentMod
let currentCA

function toggleCheck(x){
    let n1
    let n2
    let classClicked = x.classList[0]
    
    if(classClicked=="advantage"){n1 = 0; n2 = 1}
    if(classClicked=="disadvantage"){n1 = 1; n2 = 0}

    
    let thisBox = x.parentElement.children[n1]
    let otherBox = x.parentElement.children[n2]

    //toggle
    if($(x).is(":checked")){
        //unmark
        $(otherBox).prop('checked', false)
        //style
        warnRollModsStyle(classClicked, x)
    }

    if(!($(x).is(":checked"))){
        classClicked = "none"
        //style
        warnRollModsStyle(classClicked, x)
    }
}

const roll20 = () => {return Math.ceil(Math.random()*20)} 

const CharacterCA = (CharacterName) =>{
    for(i=0;i<party.length;i++) {if (CharacterName == party[i].name){return party[i].CA}}
}


const checkCA = (roll, mod, CA) =>{
    let result = roll + mod
    if (CA > result){return 0}
        else{return 1}
}

function calculateAttacks (x) {
    let CharacterName = x.parentElement.children[1].children[0].innerHTML
    let CA = CharacterCA(CharacterName)

    currentChar = CharacterName
    if(currentChar=="Rag'Oth'Er"){currentChar="Rag"}

    console.log ("Target:",CharacterName)
    console.log (CA+" CA")

   let attack1Box = x.parentElement.children[2].children[0].children[0].children[2]
   let attack2Box = x.parentElement.children[2].children[0].children[1].children[2]

   let mod1 = "none"
   let mod2 = "none"

   let advBox1 = x.parentElement.children[2].children[0].children[0].children[1].children[0]
   let disBox1 = x.parentElement.children[2].children[0].children[0].children[1].children[1]

   if($(advBox1).is(":checked")){mod1 = "advantage"}
   if($(disBox1).is(":checked")){mod1 = "disadvantage"}

   let advBox2 = x.parentElement.children[2].children[0].children[1].children[1].children[0]
   let disBox2 = x.parentElement.children[2].children[0].children[1].children[1].children[1]

   if($(advBox2).is(":checked")){mod2 = "advantage"}
   if($(disBox2).is(":checked")){mod2 = "disadvantage"}

   if(attack1Box.value > 0){
        showResults(hitCalculation(CA,mod1,attack1Box.value,attack1,attack1Name), x, mod1, attack1Name)
    }

   if(attack2Box.value > 0){
        showResults(hitCalculation(CA,mod2,attack2Box.value,attack2,attack2Name), x, mod2, attack2Name)
    }

    $(attack1Box).val('')
    $(attack2Box).val('')
}

const hitCalculation = (CA,attackMod,nOfAttacks,attack,attackName) =>{
    let mod = attack
    let results = []

    console.log('checking modifier:', attackMod)
    console.log('calculating', nOfAttacks, attackName,'Atacks')

    for(i=0;i<nOfAttacks;i++){ 
        if (attackMod == "none") {
            let roll = roll20();
            reportRolls(roll, mod);
            if (roll != 1 && roll != 20) {
                setCurrent(mod,CA)
                results.push(roll);
            } else {
                if (roll == 20) { results.push("critHit"); }
                if (roll == 1) { results.push("critMiss");}
            }
        }

        if (attackMod == "advantage") {
            console.log('- - -');
            let roll = roll20();
            let roll2 = roll20();
            if (roll == 20 || roll2 == 20) {
                results.push("critHit"); 
            } else {
                if (roll == 1 && roll2 == 1) {
                    results.push("critMiss");
                } else {
                    let relevantRoll
                    if(roll>=roll2){relevantRoll=roll}else{relevantRoll=roll2}
                    setCurrent(mod,CA)
                    results.push(relevantRoll);
                }
            } reportRolls(roll, mod);reportRolls(roll2, mod);
        }

        if (attackMod == "disadvantage") {
            console.log('- - -');
            let roll = roll20();
            let roll2 = roll20();
            reportRolls(roll, mod);reportRolls(roll2, mod);
            if (roll == 1 || roll2 == 1) {
                results.push("critMiss");
            } else {
                if (roll == 20 && roll2 == 20) { results.push("critHit");}
                else {
                    let relevantRoll
                    if(roll<=roll2){relevantRoll=roll}else{relevantRoll=roll2}
                    setCurrent(mod,CA)
                    results.push(relevantRoll);
                }
            }
        }

     }
    console.log(results)   
    return results
}

const showResults = (results, x, mod, typeOfAttack) => {
    let mainParent = x.parentElement.parentElement.parentElement.parentElement.parentElement
    let resultsToShow = " "
    let cardTitle = typeOfAttack + " Attacks"

    updateVisibleWindows(currentChar, typeOfAttack)

    results.forEach((result) => {
            if(result == 'hit'){resultsToShow += "<span class='hit btn btn-success'>HIT</span>"}           
            if(result == 'miss'){resultsToShow += "<span class='miss btn btn-danger'>miss</span>"}
            if(result == 'critHit'){resultsToShow += "<span class='crithit btn btn-success'>CRIT</span>"}           
            if(result == 'critMiss'){resultsToShow += "<span class='critmiss btn btn-danger'>CRIT</span>"}
            if(result != 'critHit' && result != 'critMiss'){
                    let didItHit = checkCA(result, currentMod, currentCA)
                    if (didItHit == 0) {resultsToShow += "<span class='miss btn btn-danger numberResult'>"+result+"</span>"}
                     else {resultsToShow += "<span class='hit btn btn-success numberResult'>"+result+"</span>"}
             }
        }
    ) 

    $(mainParent).append(
            `
        <div class="card mt-3 ml-3 shadow" id="${currentChar}${typeOfAttack}">
            <div class="card-body ${mod}FinalCard">
                 <h4 class="card-title">${cardTitle} (+${attack1})</h4>
                 <p class="card-text">${resultsToShow}</p>
            </div>
        </div>
            `
          ) 
}

const updateVisibleWindows = (CharacterName, typeOfAttack) => {
    let idName = '#' + CharacterName + typeOfAttack
   $(idName).remove()
}

const warnRollModsStyle = (classClicked, element) =>{

    box = element.parentElement.parentElement

    modText = element.parentElement.parentElement.children[3]

    if(classClicked == "advantage"){
        $(box).addClass('advantage')
        $(box).removeClass('disadvantage')
        $(modText).html("Vantagem")
    }
    if(classClicked == "disadvantage"){
        $(box).addClass('disadvantage')
        $(box).removeClass('advantage')
        $(modText).html("Desvantagem")
    }
    if(classClicked == "none"){
        $(box).removeClass('disadvantage')
        $(box).removeClass('advantage')
        $(modText).html("")
    }
}

const reportRolls = (roll, mod) =>{
    console.log('result is '+ (roll+mod) +' ('+roll+'+'+mod+')')
}

const setCurrent = (mod,CA) =>{
     currentMod = mod
     currentCA = CA
}