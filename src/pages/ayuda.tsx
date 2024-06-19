import { useState } from 'react';
import { Header } from "@/components/Nav/Header";
import { BrowserView, MobileView } from 'react-device-detect';

function Ayuda() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    empresa: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        alert('Email enviado exitosamente');
      } else {
        alert('Hubo un error al enviar el email');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al enviar el email');
    }
  };

  return (
    <>
        <BrowserView>
            <div className="m-0 bg-[#f1f1f1] p-0 h-screen font-inter text-black">
            <Header />
            <div className='w-full'>
                <p className='text-3xl text-center font-bold mb-5'><span className='font-normal'>¿Tienes dudas?</span> <br />¡Pregúntanos!</p>
                <form className='w-1/3 bg-white p-5 rounded-3xl mx-auto mb-9 shadow-2xl shadow-black/40' onSubmit={handleSubmit}>
                    <div>
                    <label>
                        <p className='text-lg font-medium'>
                            Nombre completo:
                        </p>
                    </label>
                    <input className='w-full bg-gray-50 p-2 rounded-xl border border-gray-300' type="text" name="nombre" value={form.nombre} onChange={handleChange} required />
                    </div>
                    <div>
                    <label>
                        <p className='text-lg font-medium'>
                            Email:
                        </p>
                    </label>
                    <input className='w-full bg-gray-50 p-2 rounded-xl border border-gray-300' type="email" name="email" value={form.email} onChange={handleChange} required />
                    </div>
                    <div>
                    <label>
                        <p className='text-lg font-medium'>
                            Empresa:
                        </p>
                    </label>
                    <input className='w-full bg-gray-50 p-2 rounded-xl border border-gray-300' type="text" name="empresa" value={form.empresa} onChange={handleChange} required />
                    </div>
                    <div>
                    <label>
                        <p className='text-lg font-medium'>
                            Mensaje:
                        </p>
                    </label>
                    <textarea className='w-full bg-gray-50 p-2 rounded-xl border border-gray-300' name="mensaje" value={form.mensaje} onChange={handleChange} required />
                    </div>
                    <p className='mt-2 text-md text-center font-semibold'>Te responderemos por correo electrónico lo antes posible</p>
                    <button className='w-full bg-black text-white text-lg font-bold rounded-xl py-2 px-2 mt-2' type="submit">Enviar</button>
                </form>
            </div>
            </div>
        </BrowserView>
        <MobileView>
            <div className="m-0 bg-[#f1f1f1] p-0 pb-20 h-full font-inter text-black">
            <Header />
            <div className='w-full'>
                <p className='mt-11 text-4xl text-center font-bold mb-5'><span className='font-normal'>¿Tienes dudas?</span> <br />¡Pregúntanos!</p>
                <form className='w-4/5 bg-white p-5 rounded-3xl mx-auto mt-5 mb-9 shadow-2xl shadow-black/40' onSubmit={handleSubmit}>
                    <div>
                    <label>
                        <p className='text-lg font-medium'>
                            Nombre completo:
                        </p>
                    </label>
                    <input className='w-full bg-gray-50 p-2 rounded-xl border border-gray-300' type="text" name="nombre" value={form.nombre} onChange={handleChange} required />
                    </div>
                    <div>
                    <label>
                        <p className='text-lg font-medium'>
                            Email:
                        </p>
                    </label>
                    <input className='w-full bg-gray-50 p-2 rounded-xl border border-gray-300' type="email" name="email" value={form.email} onChange={handleChange} required />
                    </div>
                    <div>
                    <label>
                        <p className='text-lg font-medium'>
                            Empresa:
                        </p>
                    </label>
                    <input className='w-full bg-gray-50 p-2 rounded-xl border border-gray-300' type="text" name="empresa" value={form.empresa} onChange={handleChange} required />
                    </div>
                    <div>
                    <label>
                        <p className='text-lg font-medium'>
                            Mensaje:
                        </p>
                    </label>
                    <textarea className='w-full bg-gray-50 p-2 rounded-xl border border-gray-300' name="mensaje" value={form.mensaje} onChange={handleChange} required />
                    </div>
                    <p className='mt-2 text-md text-center font-semibold'>Te responderemos por correo electrónico lo antes posible</p>
                    <button className='w-full bg-black text-white text-lg font-bold rounded-xl py-2 px-2 mt-2' type="submit">Enviar</button>
                </form>
            </div>
            </div>

        </MobileView>
    </>
  );
}

export default Ayuda;
