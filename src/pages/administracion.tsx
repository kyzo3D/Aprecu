import React, { useEffect, useState } from 'react';
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import GoogleDrive from '@uppy/google-drive';
import Dropbox from '@uppy/dropbox';
import Transloadit from '@uppy/transloadit';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import { Header } from "@/components/Nav/Header";

function Administracion() {
  const [uppy, setUppy] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const uppyInstance = new Uppy({ id: 'uppy' })
      .use(GoogleDrive, { companionUrl: 'https://companion.uppy.io' })
      .use(Dropbox, { companionUrl: 'https://companion.uppy.io' })
      .use(Transloadit, {
        params: {
          auth: { key: 'YOUR_TRANSLOADIT_KEY' }, // Reemplaza con tu clave de Transloadit
          template_id: 'YOUR_TEMPLATE_ID', // Reemplaza con tu ID de plantilla de Transloadit
        },
      });

    uppyInstance.on('complete', () => {
      setMessage('¡Bien hecho! Tus archivos están siendo verificados, subiéndose a Blockchain');
    });

    setUppy(uppyInstance);

    return () => uppyInstance.close();
  }, []);

  if (!uppy) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="m-0 bg-[#f1f1f1] p-0 font-inter text-black">
      <Header />
      <Dashboard uppy={uppy} proudlyDisplayPoweredByUppy={false} />
      {message && <div className="alert alert-success">{message}</div>}
    </div>
  );
}

export default Administracion;
