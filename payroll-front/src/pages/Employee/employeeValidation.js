export function validateForm(fields) {
    console.log('---------validation---------')
    console.log('fields', fields)
    var formIsValid = true
    let errObj = {}
    if(Object.keys(fields).length === 0){
        console.log('Error')
        formIsValid = false
    }
    if(!fields.Employee_Code || fields.Employee_Code == ""){
        errObj['Employee_Code'] = '*Please Enter Employee Code.'
        formIsValid = false
    }
    if(!fields.First_Name || fields.First_Name == ""){
        errObj['First_Name'] = '*Please Enter Fisrt Name.'
        formIsValid = false
    }
    if(!fields.Last_Name || fields.Last_Name == ""){
        errObj['Last_Name'] = '*Please Enter Last Name.'
        formIsValid = false
    }
    if(!fields.fatherName || fields.fatherName == ""){
        errObj['fatherName'] = '*Please Enter Father Name.'
        formIsValid = false
    }
    if(!fields.date_of_birth || fields.date_of_birth == ""){
        errObj['date_of_birth'] = '*Please Enter DOB.'
        formIsValid = false
    }
    if(!fields.date_of_joining || fields.date_of_joining == ""){
        errObj['date_of_joining'] = '*Please Enter DOJ.'
        formIsValid = false
    }
    if(!fields.Contact_Number || fields.Contact_Number.length != 10){
        errObj['Contact_Number'] = '*Please Enter Valid Number.'
        formIsValid = false
    }
    if(!fields.Alternate_Contact_number || fields.Alternate_Contact_number.length != 10){
        errObj['Alternate_Contact_number'] = '*Please Enter Valid Number.'
        formIsValid = false
    }
    if(!fields.Contact_Number_Home || fields.Contact_Number_Home.length != 10){
        errObj['Contact_Number_Home'] = '*Please Enter Valid Number.'
        formIsValid = false
    }
    let emailRegex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(!fields.email || !emailRegex.test(fields.email)){
        errObj['email'] = '*Please Enter Valid Email.'
        formIsValid = false
    }
    if(!fields.Blood_Group || fields.Blood_Group == ""){
        errObj['Blood_Group'] = '*Please Select Blood Group.'
        formIsValid = false
    }
    if(!fields.Position || fields.Position == ""){
        errObj['Position'] = '*Please Enter Position.'
        formIsValid = false
    }
    if(!fields.Nationality || fields.Nationality == ""){
        errObj['Nationality'] = '*Please Enter Nationality.'
        formIsValid = false
    }
    if(!fields.gender || fields.gender == ""){
        errObj['gender'] = '*Please Select Gender.'
        formIsValid = false
    }
    if(!fields.Marital_Status || fields.Marital_Status == ""){
        errObj['Marital_Status'] = '*Please Select Marital Status.'
        formIsValid = false
    }
    if(!fields.Bank_IFSC || fields.Bank_IFSC == ""){
        errObj['Bank_IFSC'] = '*Please Enter Bank IFSC.'
        formIsValid = false
    }
    if(!fields.Bank_No || fields.Bank_No == ""){
        errObj['Bank_No'] = '*Please Enter Bank Number.'
        formIsValid = false
    }
    if(!fields.PAN_No || fields.PAN_No.length != 10){
        errObj['PAN_No'] = '*Please Enter Pan Number.'
        formIsValid = false
    }
    if(!fields.ADHAR || fields.ADHAR.length != 12){
        errObj['ADHAR'] = '*Please Enter Aadhar Number.'
        formIsValid = false
    }
    if(!fields.DEGREE || fields.DEGREE == ""){
        errObj['DEGREE'] = '*Please Select Degree.'
        formIsValid = false
    }
    if(!fields.STREAM || fields.STREAM == ""){
        errObj['STREAM'] = '*Please Enter Stream.'
        formIsValid = false
    }
    if(!fields.PASSED || fields.PASSED == ""){
        errObj['PASSED'] = '*Please Select Passed / Appearing.'
        formIsValid = false
    }
    if(!fields.YEAR_OF_PASSING || fields.YEAR_OF_PASSING == ""){
        errObj['YEAR_OF_PASSING'] = '*Please Enter Passing Year'
        formIsValid = false
    }
    if(!fields.PERCENTAGE_OF_MARKS || fields.PERCENTAGE_OF_MARKS == ""){
        errObj['PERCENTAGE_OF_MARKS'] = '*Please Enter Percentage'
        formIsValid = false
    }
    if(!fields.PERCENTAGE_OF_MARKS || fields.PERCENTAGE_OF_MARKS == ""){
        errObj['PERCENTAGE_OF_MARKS'] = '*Please Enter Percentage'
        formIsValid = false
    }
    if(!fields.Current_Address || fields.Current_Address == ""){
        errObj['Current_Address'] = '*Please Enter Current Address'
        formIsValid = false
    }
    if(!fields.Permanent_Address || fields.Permanent_Address == ""){
        errObj['Permanent_Address'] = '*Please Enter Permanent Address'
        formIsValid = false
    }
    console.log('errObj',errObj)
    return {formIsValid , errObj}
}