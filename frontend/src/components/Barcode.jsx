import './Barcode'
import { useEffect, useRef } from 'react'
import JsBarcode from 'jsbarcode'

function Barcode(props) {
  const barcodeRef = useRef(null)

  useEffect(() => {
    const height = props.height ? props.height : 14
    const width = props.width ? props.width : 0.8
    const fontSize = props.fontSize ? props.fontSize : 14

    if (barcodeRef.current && props.value !== '') {
      JsBarcode(barcodeRef.current, props.value, {
        displayValue: true,
        text: props.value,
        height: height,
        width: width,
        fontSize: fontSize,
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
