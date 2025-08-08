import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SignaturePad = ({ onSave }) => {
  const sigCanvas = useRef();

  const clear = () => sigCanvas.current.clear();

  const save = () => {
    if (sigCanvas.current.isEmpty()) {
      alert("Please sign before saving.");
      return;
    }
    const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    onSave(dataURL);
  };

  return (
    <div>
      <SignatureCanvas
        penColor="black"
        canvasProps={{ width: 500, height: 200, className: 'border border-dark rounded' }}
        ref={sigCanvas}
      />
      <button onClick={clear}>Clear</button>
      <button onClick={save}>Save Signature</button>
    </div>
  );
};

export default SignaturePad;
