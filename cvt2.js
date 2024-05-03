
const fs = require('fs');
const { Parser } = require('node-sql-parser');
const parser = new Parser();

// Read the file with SQL INSERT statements
fs.readFile('sql_inserts.sql', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const ast = parser.astify(data); // mysql sql grammer parsed by default
    for (let i = 0; i < ast.length; i++) {
        //console.log(ast[i].table[0].table);

        // Construct the Redis HSET statement
        let redisHSETStatement = `HSET cvt:${ast[i].table[0].table}:`;
        for (let j=0; j < ast[i].columns.length; j++) {
            //console.log(`${ast[i].columns[j]} = ${ast[i].values[0].value[j].value}`);            
            if (j === 0) 
                redisHSETStatement += `${ast[i].values[0].value[j].value} `;
            redisHSETStatement += `${ast[i].columns[j]} ${ast[i].values[0].value[j].value} `;
        };
        console.log(redisHSETStatement.trim());
      }
});

/*
   Generated by Chat-GPT
*/