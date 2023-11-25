function update() {
  let current = SpreadsheetApp.getActiveSpreadsheet();
  let source = current.getSheetByName('Friday');
  let incoming = current.getSheetByName('New');

  const sourceData = source.getDataRange().getValues();
  const incomingData = incoming.getDataRange().getValues();

  const new_column = sourceData[0].length + 1;
  let new_date = source.getRange(1, new_column);
  new_date.setValue(curr_date());

  for(let i = 0; i < incomingData.length; i++) {
    let id = incomingData[i][4];
    let done = true;
    for(let j = 1; j < sourceData.length; j++) {
      if(id == sourceData[j][3]) {
        let update_row = source.getRange(j+1, new_column);
        update_row.setBackground('#00FF00');
        done = false;
        break;
      }
    }
    if(done) {
      let income = incomingData[i];
      income.shift();
      source.appendRow(income);
      let update_row = source.getRange(source.getDataRange().getValues().length, new_column);
      update_row.setBackground('#00FF00');
    }
  }

  const range = source.getRange(2, 1, source.getLastRow()-1, source.getLastColumn());
  range.sort({column: 2, ascending: true});
}

function curr_date() {
  let today = new Date();
  let month = today.getMonth() + 1;
  let date = today.getDate();

  let new_date = month + '/' + date;
  return new_date;
}

