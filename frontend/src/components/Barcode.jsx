import './Barcode'
import { useEffect, useRef } from 'react'
import JsBarcode from 'jsbarcode'

function Barcode(props) {
  const barcodeRef = useRef(null)

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, props.value, {
        displayValue: true,
        text: props.value,
        height: 14,
        width: 0.8,
        fontSize: 14,
        lineColor: 'black',
        background: 'transparent'
      })
    }
  }, [props.value])

  return (
    <div className="Barcode">
      <svg ref={barcodeRef} />
    </div>
  )
}

export default Barcode
