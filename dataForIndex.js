import axios from 'axios';
import fs from 'fs'
import csv from 'csv-parser';

const indexData = async () => {
    const results = [];

    // Read CSV file
    fs.createReadStream('/Users/savvy/Desktop/Task/Data.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            // Index each employee document
            for (const employee of results) {
                try {
                    const response = await axios.post('http://localhost:9200/employees/_doc', {
                        id: employee.id,
                        name: employee.name,
                        age: employee.age,
                        department: employee.department,
                        salary: employee.salary,
                    });
                    console.log('Document indexed:', response.data);
                } catch (error) {
                    console.error('Error indexing document:', error);
                }
            }
        });
};

indexData();
