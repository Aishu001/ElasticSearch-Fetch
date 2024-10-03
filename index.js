import axios from "axios";

const createIndex = async () => {
    try {
        const response = await axios.put('http://localhost:9200/employees', {
            settings: {
                number_of_shards: 1,
                number_of_replicas: 0,
            },
            mappings: {
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'text' },
                    age: { type: 'integer' },
                    department: { type: 'text' },
                    salary: { type: 'float' },
                },
            },
        });
        console.log('Index created:', response.data);
    } catch (error) {
        console.error('Error creating index:', error);
    }
};

createIndex();
