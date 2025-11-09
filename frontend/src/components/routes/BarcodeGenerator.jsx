import './BarcodeGenerator.css'
import { useContext, useState, useEffect } from 'react'
import { AppContext } from '../../contexts/AppContext'
import useFormState from '../../hooks/useFormState'
import useToggle from '../../hooks/useToggle'
import Print from '../Print'
import Barcode from '../Barcode'
import { splitTextData } from '../../utils'
import { storageGet, storageSet } from '../../utils/localStorage'

const BarcodeGenerator = () => {
  const appContext = useContext(AppContext)
  const [textData, handleTextDataChange] = useFormState('')
  const [barcodes, setBarcodes] = useState([])
  const [isPrinting, toggleIsPrinting] = useToggle(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    const values = splitTextData(textData, {
      isRemoveWhiteSpace: true,
      isLowerCase: false
    })

    setBarcodes(values)
    storageSet('barcodes', values)
  }

  const handlePrint = () => {
    toggleIsPrinting()
  }

  const checkBarcodes = () => {
    const storageBarcodes = storageGet('barcodes')

    if (storageBarcodes) {
      setBarcodes(storageBarcodes)
    }
  }

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
            <div className="btns-wrap">
              <button
                type="button"
                onClick={handlePrint}
                disabled={
                  appContext.isLoading || barcodes.length <= 0 ? true : false
                }
              >
                Print
              </button>
            </div>
          </div>

          <div className="barcodes light">
            {!appContext.isLoading ? (
              <Print>
                {barcodes.length > 0 ? (
                  <div className="barcodes-grid">
                    {barcodes.map((b, index) => (
                      <Barcode
                        key={`${b}_${index}`}
                        value={b}
                        width={1}
                        height={20}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="msg">No barcodes!</p>
                )}
              </Print>
            ) : (
              <LoadingIcon />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BarcodeGenerator
