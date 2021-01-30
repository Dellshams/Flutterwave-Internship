const express = require('express');
const bodyParser = require('body-parser');
const debug = require('debug')('app');
const morgan = require('morgan');


const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(morgan('tiny'));

const port = 4000

const details = {
    name: 'Ayodele Saba',
    github: '@dellshams',
    email: 'ayodelesaba@gmail.com',
    mobile: '08095158177',
    twitter: '@dellshams'
}

app.get('/', (req, res) => {
    res.status(200).json({
        message: "My Rule-Validation API",
        status: "success",
        data: details
    })
})


function isValidJSONString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
}

app.post('/validate-rule', (req, res) => {
    if (!isValidJSONString(JSON.stringify(req.body))) {
        return res.status(400).json({
            message: "Invalid JSON payload passed.",
            status: "error",
            data: null
        })
    }

    const { rule, data } = req.body
    console.log (rule, data)
    if (!rule) {
        return res.status(400).json({
            message: "rule is required.",
            status: "error",
            data: null
        })
    }
    if (typeof (rule) !== 'object') {
        return res.status(400).json({
            message: `rule should be an object.`,
            status: "error",
            data: null
        })
    }
    if (!data) {
        return res.status(400).json({
            message: `data is required.`,
            status: "error",
            data: null
        })
    }
    const { field, condition, condition_value } = rule
    if (!field) {
        return res.status(400).json({
            message: `field is required.`,
            status: "error",
            data: null
        })
    }
    if (!condition) {
        return res.status(400).json({
            message: `condition is required.`,
            status: "error",
            data: null
        })
    }
    if (!condition_value) {
        return res.status(400).json({
            message: `condition_value is required.`,
            status: "error",
            data: null
        })
    }
    if (typeof (field) !== 'string') {
        return res.status(400).json({
            message: `field should be a string.`,
            status: "error",
            data: null
        })
    }

    if (typeof (condition) !== 'string') {
        return res.status(400).json({
            message: `condition should be a string.`,
            status: "error",
            data: null
        })
    }

    if (typeof (condition_value) !== 'number') {
        return res.status(400).json({
            message: `condition_value should be a number.`,
            status: "error",
            data: null
        })
    }

    if(!Object.keys(data).includes(rule.field)){
        return res.status(400).json({
            message: `field ${rule.field} is missing from data.`,
            status: "error",
            data: null
        })
    }

    const fi = data[rule.field].toString()
    const con = rule.condition_value.toString()

    if (condition === "eq" && data[rule.field] !== rule.condition_value) {
            return res.status(400).json({
                message: `field ${rule.field} failed validation.`,
                status: "error",
                data: {
                    validation: {
                        error: true,
                        field: rule.field,
                        field_value: data[rule.field],
                        condition,
                        condition_value
                    }
                }
            })
        } else if (condition === "neq" ** data[rule.field] === rule.condition_value) {
            return res.status(400).json({
                message: `field ${rule.field} failed validation.`,
                status: "error",
                data: {
                    validation: {
                        error: true,
                        field: rule.field,
                        field_value: data[rule.field],
                        condition,
                        condition_value
                    }
                }
            })
        } else if (condition === "gt" && data[rule.field] <= rule.condition_value) {
            return res.status(400).json({
                message: `field ${rule.field} failed validation.`,
                status: "error",
                data: {
                    validation: {
                        error: true,
                        field: rule.field,
                        field_value: data[rule.field],
                        condition,
                        condition_value
                    }
                }
            })
        } else if (condition === "gte" && data[rule.field] < rule.condition_value) {
            return res.status(400).json({
                message: `field ${rule.field} failed validation.`,
                status: "error",
                data: {
                    validation: {
                        error: true,
                        field: rule.field,
                        field_value: data[rule.field],
                        condition,
                        condition_value
                    }
                }
            })
        } else if (condition === "contains" && !fi.includes(con)) {
            return res.status(400).json({
                message: `field ${rule.field} failed validation.`,
                status: "error",
                data: {
                    validation: {
                        error: true,
                        field: rule.field,
                        field_value: data[rule.field],
                        condition,
                        condition_value
                    }
                }
            })
        } else {
        return res.status(200).json({
            message: "field missions successfully validated.",
            status: "success",
            data: {
                validation: {
                    error: false,
                    field: rule.field,
                    field_value: data[rule.field],
                    condition,
                    condition_value
                }
            }
        })
    }


})


app.listen(port, () => console.log(`App listening on port ${port}!`))