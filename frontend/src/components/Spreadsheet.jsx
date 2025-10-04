import './Spreadsheet.css'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import { AgGridReact } from 'ag-grid-react'

ModuleRegistry.registerModules([AllCommunityModule])

const Spreadsheet = (props) => {
  return (
    <div className="Spreadsheet">
      <AgGridReact rowData={props.rowData} columnDefs={props.headers} />
    </div>
  )
}

export default Spreadsheet
