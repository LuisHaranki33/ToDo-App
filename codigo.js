const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const input = document.querySelector('#input');
const botonEnter = document.querySelector('#enter');
const check =  'fa-check-circle';
const unCheck = 'fa-circle';
const lineThrough = 'line-through';
let id
let list

// creacion fecha

const FECHA = new Date()
fecha.innerHTML=FECHA.toLocaleDateString('es-MX',{weekday:'long',month:'short',day:'numeric'})

//funcion agragar Tarea
function agregarTarea(tarea,id,realizado,eliminado){

    if(eliminado){return}
 
    const Realizado = realizado ?check :unCheck
    const Line = realizado ?  lineThrough :''
    // ?=true
    // : = false

    const elemento =  ` <li id ="elemento">
                            <i class="far ${Realizado}" data="realizado" id="${id}" ></i>
                            <p class="text ${Line}"> ${tarea} </p>
                            <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
                        </li>`
    lista.insertAdjacentHTML("beforeend",elemento)
}

//funcion de tarea realizada

function tareaRealizada(element){
    element.classList.toggle(check)
    element.classList.toggle(unCheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    list[element.id].realizado = list[element.id].realizado ?false :true
}

//tarea eliminada

function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    list[element.id].eliminado =true
}

botonEnter.addEventListener('click',()=>{
    const tarea = input.value
    if(tarea){
        agregarTarea(tarea,id,false,false)
        list.push({
            nombre: tarea,
            id:id,
            realizado:false,
            eliminado:false
        })
    }
    localStorage.setItem('TODO',JSON.stringify(list))
    input.value =''
    id++
})

document.addEventListener('keyup',function(event){
    if(event.key=='Enter'){
        cont = tarea = input.value
        if(tarea){
            agregarTarea(tarea,id,false,false)
            list.push({
                nombre: tarea,
                id:id,
                realizado:false,
                eliminado:false
            })
        }
        localStorage.setItem('TODO',JSON.stringify(list))
        input.value=''
        id++
    }
})


lista.addEventListener('click',function(event){
    const element= event.target
    const elementData= element.attributes.data.value
    if(elementData=='realizado'){

        tareaRealizada(element)

    }else if(elementData=='eliminado'){

        tareaEliminada(element)
    }
    localStorage.setItem('TODO',JSON.stringify(list))
})


//llamar el local storage

let data = localStorage.getItem('TODO')
if(data){
    list=JSON.parse(data)
    id = list.length
    cargarLista(list)
}else {
    list=[]
    id =0
}

function cargarLista(DATA){
    DATA.forEach(i => {
        agregarTarea(i.nombre,i.id,i.realizado,i.eliminado)
        
    });
}