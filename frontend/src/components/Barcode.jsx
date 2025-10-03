import { useEffect, useRef } from 'react'
import JsBarcode from 'jsbarcode'

function BarcodeDisplay(props) {
  const barcodeRef = useRef(null)

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, props.value, {
        displayValue: true,
        text: props.value,
        height: 20,
        width: 1,
        fontSize: 14
      })
    }
  }, [props.value])

  return (
    <div>
      <svg ref={barcodeRef} />
    </div>
  )
}

export default BarcodeDisplay
