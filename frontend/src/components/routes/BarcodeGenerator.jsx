import './BarcodeGenerator.css'
import { useContext, useState, useEffect } from 'react'
import { AppContext } from '../../contexts/AppContext'
import useFormState from '../../hooks/useFormState'
import useToggle from '../../hooks/useToggle'
import Print from '../Print'

const BarcodeGenerator = () => {
  const appContext = useContext(AppContext)
  const [textData, handleTextDataChange, setTextData] = useFormState('')
  const [barcodes, setBarcodes] = useState([])
  const [isPrinting, toggleIsPrinting] = useToggle(false)

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const handlePrint = () => {
    toggleIsPrinting()
  }

  const checkBarcodes = () => {}

  useEffect(() => {
    checkBarcodes()

    if (isPrinting) {
      window.print()

      toggleIsPrinting()
    }
  }, [isPrinting])

  return (
    <div className="BarcodeGenerator">
      <header>
        <h1>Barcode Generator</h1>
      </header>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <button
              type="submit"
              disabled={appContext.isLoading ? true : false}
            >
              Generate
            </button>
          </div>

          <textarea
            disabled={appContext.isLoading ? true : false}
            onChange={handleTextDataChange}
            className="light"
            name="textData"
            id="textData"
            value={textData}
            required
            placeholder={`Paste values here...`}
          ></textarea>
        </form>

        <div className="barcodes-wrapper">
          <div className="inputs">
            {barcodes.length > 0 && (
              <div className="btns-wrap">
                <button type="button" onClick={handlePrint}>
                  Print
                </button>
              </div>
            )}
          </div>

          {!appContext.isLoading ? <Print></Print> : <LoadingIcon />}
        </div>
      </div>
    </div>
  )
}

export default BarcodeGenerator
