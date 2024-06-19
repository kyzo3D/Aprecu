import { Footer } from "@/components/Nav/Footer";
import { Header } from "@/components/Nav/Header";

function Documentacion() {
  

  return (
    <div className="m-0 bg-[#f1f1f1] p-0 font-inter text-black">
        <Header />
        <p className="text-5xl font-bold text-center">Documentación</p>
        <p className="mt-11 text-2xl font-bold text-center">Indice</p>
        <p className="hover:font-bold text-lg text-center underline underline-offset-1">1.- Instrucciones de comprobación anti-falsificación</p>
        <p className="hover:font-bold text-lg text-center underline underline-offset-1">2.- Intrucciones de subida de productos</p>
        <p className="mt-11 text-xl font-bold text-center">Intrucciones de comprobación anti-falsificación</p>
        <div className="mt-5 w-2/3 mx-auto">
          <ol className="mx-auto text-justify">
            <li>1. Entramos a <span className="font-semibold">Productos</span> a través del segundo elemento de la barra superior de navegación.</li>
            <li><img className="mt-5 mb-11 w-full rounded-xl shadow-xl shadow-black/20" alt="productos" src="/productos.png" /></li>
            <li>2. Una vez dentro, veremos todos los productos, buscamos por <span className="font-semibold">código de barras</span> en la barra de búsqueda que encontraremos al inicio de la página.</li>
            <li><img className="mt-5 mb-11 w-full rounded-xl shadow-xl shadow-black/20" alt="productos" src="/busqueda.png" /></li>
            <li>3. <span className="font-semibold">Introducimos el código de barras</span> y aparecerá el producto correspondiente.</li>
            <li><img className="mt-5 mb-11 w-full rounded-xl shadow-xl shadow-black/20" alt="productos" src="/codigo_buscado.png" /></li>
            <li>4. <span className="font-semibold">Hacemos click en el producto</span> y encontraremos la información pertinente facilitada por el fabricante.</li>
            <li><img className="mt-5 mb-11 w-full rounded-xl shadow-xl shadow-black/20" alt="productos" src="/producto.png" /></li>
          </ol>
        </div>
        <p className="mt-20 text-xl font-bold text-center">Intrucciones de subida de productos</p>
        <div className="mt-5 w-2/3 mx-auto">
          <ol className="mx-auto text-justify">
            <li>1. Entramos a <span className="font-semibold">Productos</span> a través del segundo elemento de la barra superior de navegación.</li>
            <li><img className="mt-5 mb-11 w-full rounded-xl shadow-xl shadow-black/20" alt="productos" src="/productos.png" /></li>
            <li>2. Una vez dentro, veremos todos los productos, buscamos por <span className="font-semibold">código de barras</span> en la barra de búsqueda que encontraremos al inicio de la página.</li>
            <li><img className="mt-5 mb-11 w-full rounded-xl shadow-xl shadow-black/20" alt="productos" src="/busqueda.png" /></li>
            <li>3. <span className="font-semibold">Introducimos el código de barras</span> y aparecerá el producto correspondiente.</li>
            <li><img className="mt-5 mb-11 w-full rounded-xl shadow-xl shadow-black/20" alt="productos" src="/codigo_buscado.png" /></li>
            <li>4. <span className="font-semibold">Hacemos click en el producto</span> y encontraremos la información pertinente facilitada por el fabricante.</li>
            <li><img className="mt-5 mb-11 w-full rounded-xl shadow-xl shadow-black/20" alt="productos" src="/producto.png" /></li>
          </ol>
        </div>
    </div>
  );
}

export default Documentacion;
