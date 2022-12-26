//  Simulador de compra Tienda: Orgánicos del Retiro
let user = prompt( "Ingresa tu nombre");
//Saludar  con una función
function saludar (){
    alert (`Hola ${user}, bienvenido a mi segunda entrega. Es un simulador de compras en donde puedes agregar 3 tipos de productos de un mercado orgánico, cuenta con inventario y opciones de pago dependiendo si es débito o crédito hasta 12 cuotas. Si estás listo, presiona enter para continuar.`);
}
saludar();

// Definición funciones cuotas (funciona con el método de pago)
function totalRecargo (total,porcentaje,cuota){
    let porcentajeFinal=porcentaje*cuota;
    let totalCompra = total + (total*porcentajeFinal);
    return totalCompra;
}

function montoCuota(total,cuotas){
    let montoCuota = (total/cuotas).toFixed(2);
    return montoCuota;
}

// Validación
function validacion(entrada,rangoMin,rangoMax,mensaje){

    if(isNaN(entrada)==false && entrada>rangoMin && entrada<=rangoMax){
        return true;
    }
    else{
        alert(`${mensaje}`);
        return false;
    }
}
//Clase constructora de producto
class Producto{
    constructor (id,nombre,precio,inventario){
        this.id=id;
        this.nombre=nombre;
        this.precio=precio;
        this.inventarioReal=inventario;
        this.inventarioInicial=inventario;
    }
    descontarInventario (cantidad){
        this.inventarioReal=this.inventarioReal-cantidad;
    }
    
}

function precioFinal (cantidad,precio){
    return cantidad*precio;
}


// Variables y constantes

//Construir Productos (Pimentones, Remolachas, Zanahorias) precio e inventario individual
const productoUno = new Producto(1,"Pimentones 250grs",9800,79);
const productoDos = new Producto(2,"Remolachas 250grs",7500,50);
const productoTres = new Producto(3,"Zanahorias 250grs",9650,45);
const carrito=[];
const interes=0.06;


let totalParcial=0;

// Opciones selección usuario
let seleccion;
let cantidad;
let agrega;
let metodoPago;
let cuotas;
let confirmaPago;

// Totalizacion compra
let totalCompra;
let valorCuota;
let listaCarrito="";


// funcionalidad del programa (carrito compras)
do{
    do{
        seleccion = parseInt(prompt(`Bienvenidos a orgánicos del retiro:\nEscribe el número del producto que deseas agregar al carrito:\n1.  ${productoUno.nombre} - $${productoUno.precio} (inventario: ${productoUno.inventarioReal})\n2.  ${productoDos.nombre} - $${productoDos.precio} (inventario: ${productoDos.inventarioReal})\n3.  ${productoTres.nombre} - $${productoTres.precio} (inventario: ${productoTres.inventarioReal})`));
    }
    while(validacion(seleccion,0,3,"La opción ingresada no es válida, inténtalo nuevamente.")==false);

    if(seleccion==1 && productoUno.inventarioReal>0){

        do{
            cantidad = parseInt(prompt(`${productoUno.nombre} tiene un valor de $${productoUno.precio}\n¿Cuántos deseas agregar al carrito? (inventario:${productoUno.inventarioReal})`));
        } while(validacion(cantidad,0,productoUno.inventarioReal,"La opción ingresada no es válida, inténtalo nuevamente.")==false);

        productoUno.descontarInventario(cantidad);

        if (carrito.includes(productoUno)==false){
            carrito.push(productoUno);
        }      

    } else if(seleccion==2 && productoDos.inventarioReal>0){

        do{
            cantidad = parseInt(prompt(`${productoDos.nombre} tiene un valor de $${productoDos.precio}\n¿Cuántos deseas agregar al carrito? (inventario:${productoDos.inventarioReal})`));
        } while(validacion(cantidad,0,productoDos.inventarioReal," La opción ingresada no es válida, inténtalo nuevamente.")==false);

        productoDos.descontarInventario(cantidad);

        if (carrito.includes(productoDos)==false){
            carrito.push(productoDos);
        }

        
    } else if(seleccion==3 && productoTres.inventarioReal>0) {

        do{
            cantidad = parseInt(prompt(`${productoTres.nombre} tiene un valor de $${productoTres.precio}\n¿Cuántos deseas agregar al carrito? (inventario:${productoTres.inventarioReal})`));
        } while(validacion(cantidad,0,productoTres.inventarioReal,"La opción ingresada no es válida, inténtalo nuevamente.")==false);

        productoTres.descontarInventario(cantidad);

        if (carrito.includes(productoTres)==false){
            carrito.push(productoTres);
        }


    }else{
        alert("No hay inventario disponible del producto seleccionado.");
    }
        carrito.forEach((Producto)=>(
            listaCarrito= listaCarrito + `${Producto.nombre} - $${precioFinal(Producto.inventarioInicial-Producto.inventarioReal,Producto.precio)}\n`))
        do {
                
            agrega = parseInt(prompt(`CARRITO:\n${listaCarrito}\n¿Deseas agregar algo más?\n 1. Sí - 2. No`));
            
            if(agrega==1){
                listaCarrito="";
            }
        } while(validacion(agrega,0,2,"Error: Ingresaste una opción inválida, inténtalo nuevamente.")==false);

}while(agrega==1);

// Funcionalidad del programa (Métodos de pago) débito y crédito con cuotas

totalParcial = precioFinal(productoUno.inventarioInicial-productoUno.inventarioReal,productoUno.precio) + precioFinal(productoDos.inventarioInicial-productoDos.inventarioReal,productoDos.precio) + precioFinal(productoTres.inventarioInicial-productoTres.inventarioReal,productoTres.precio);

do {
    
    metodoPago = parseInt(prompt(`MÉTODOS DE PAGO:\nEl total de tu compra es de $${totalParcial}\n¿Qué metodo de pago deseas utilizar?\n 1. Débito\n 2. Tarjeta de Crédito`));

} while(validacion(metodoPago,0,2,"La opción ingresada no es válida, inténtalo nuevamente.")==false);

if(metodoPago==2){
    do{
        do{
            cuotas=parseInt(prompt("TARJETA DE CRÉDITO:\n¿En cuántas cuotas deseas hacer tu pago? Puedes elegir 1 cuota sin interés ó hasta 12 cuotas con  6% de interés por cuota\nIngresa la cantidad de cuotas a realizar:"));
        }while(validacion(cuotas,0,12,"La opción ingresada no es válida, inténtalo nuevamente.")==false);

        if(cuotas==1){

            do{
                confirmaPago=parseInt(prompt(`CONFIRMACIÓN DE TU COMPRA:\nEl total de la compra es de $${totalCompra=totalParcial} a pagarse en 1 cuota sin interés\n¿Deseas continuar?\n 1. Confirmar pago\n 2. Elegir otra cantidad de cuota/s`));
            }while(validacion(confirmaPago,0,2,"La opción ingresada no es válida, inténtalo nuevamente.")==false);
            valorCuota=totalCompra;

        }else{

            do{
                confirmaPago=parseInt(prompt(`CONFIRMACIÓN DE TU COMPRA:\nEl total de la compra es de $${totalCompra=totalRecargo(totalParcial,interes,cuotas)} a abonarse en ${cuotas} cuotas de $${valorCuota=montoCuota(totalRecargo(totalParcial,interes,cuotas),cuotas)}\n¿Deseas continuar?\n 1. Confirmar pago\n 2. Elegir otro número de cuota/s`));
            }while(validacion(confirmaPago,0,2,"la opción ingresada no es válida, inténtalo nuevamente.")==false);

        }
    }while(confirmaPago==2);

    alert(`TU COMPRA FUE EXITOSA:\nPagaste $${totalCompra} con Tarjeta de Crédito en ${cuotas} cuota/s de $${valorCuota}\n¡Gracias por tu compra!`);

}else{
    alert(`TU COMPRA FUE EXITOSA:\nPagaste $${totalParcial} con Tarjeta Débito\n¡Gracias por tu compra!`);
}
//despedida
function despedida(){
    alert (`Gracias por corregir mi entrega ${user}, que tengas un gran día!`);
}
despedida();