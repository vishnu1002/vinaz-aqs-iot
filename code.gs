function doGet(e) { 

  Logger.log( JSON.stringify(e) );
  var result = 'Ok';

  if (e.parameter == 'undefined') {
    result = 'No Parameters';
  }
  else {
    var sheet_id = '..........'; 	// Spreadsheet ID
    var sheet = SpreadsheetApp.openById(sheet_id).getActiveSheet();
    var newRow = sheet.getLastRow() + 1;						

    var rowData = [];

    // Date in column A
    var Curr_Date = new Date();
    rowData[0] = Curr_Date;

    // Time in column B
    var Curr_Time = Utilities.formatDate(Curr_Date, "GMT+5:30", 'HH:mm:ss');
    rowData[1] = Curr_Time;

    for (var param in e.parameter) 
    {
      Logger.log('In for loop, param=' + param);
      var value = stripQuotes(e.parameter[param]);
      Logger.log(param + ':' + e.parameter[param]);

      switch (param) 
      {
        // Column C
        case 'temp':
          rowData[2] = value;
          result = 'Temperature Written on column C'; 
          break;

        // Column D
        case 'humid':
          rowData[3] = value;
          result += 'Humidity Written on column D'; 
          break;

        // Column E
        case 'co2':
          rowData[4] = value;
          result += 'CO2 Written on column D'; 
          break; 

        // Column F
        case 'co':
          rowData[5] = value;
          result += 'CO Written on column D'; 
          break; 

        // Column G
        case 'nh4':
          rowData[6] = value;
          result += 'NH4 Written on column D'; 
          break;

        default:
          result = "Unsupported Parameter!";
      }
    }
    
    Logger.log(JSON.stringify(rowData));

    // Write the row data to the new row in the spreadsheet
    var newRange = sheet.getRange(newRow, 1, 1, rowData.length);
    newRange.setValues([rowData]);

  }

  return ContentService.createTextOutput(result);

}

// Function to strip quotes from a string value
function stripQuotes( value ) {
  return value.replace(/^["']|['"]$/g, "");
}
