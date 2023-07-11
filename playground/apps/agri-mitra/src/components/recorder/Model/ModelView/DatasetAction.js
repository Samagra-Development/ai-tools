import C from "../../../constants";

export default function ClearDetailedReport() {
    return {     
        type: C.CLEAR_DETAILED_REPORT,
        payload: {
            
        }
    }
}


export  function PageChange(page, constant) {
    return {     
        type: constant,
        payload: page
    }
}

export  function RowChange(count, constant) {
    return {     
        type: constant,
        payload: count
    }
}

export  function ClearTableValue( constant) {
    return {     
        type: constant,
        payload: {}
    }
}

export  function FilterTable( filterValues,constant) {
    return {     
        type: constant,
        payload: {filterValues}
    }
}

export function tableView (token,constant){
    return {     
        type: constant,
        payload: {token}
    }
}

export  function clearFilter( filterValues,constant) {
    return {     
        type: constant,
        payload: {filterValues}
    }
}

export  function clearFilterModel( filterValues,constant) {
    return {     
        type: constant,
        payload: {filterValues}
    }
}

export  function FilterModel( filterValues,constant) {
    return {     
        type: constant,
        payload: {filterValues}
    }
}





