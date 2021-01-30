const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

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
    // if (!isValidJSONString(req.body)) {
    //     return res.status(400).json({
    //         message: "Invalid JSON payload passed.",
    //         status: "error",
    //         data: null
    //     })
    // }
    
    const { rule, data } = req.body
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

    if (condition === "eq") {
        if (rule.field !== data[rule.field] || data[rule.field] !== rule.condition_value) {
            return re.status(400).json({
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
        }
    } else if (condition === "neq") {
        if (rule.field !== data[rule.field] || data[rule.field] === rule.condition_value) {
            return re.status(400).json({
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
        }
    } else if (condition === "gt") {
        if (rule.field !== data[rule.field] || data[rule.field] <= rule.condition_value) {
            return re.status(400).json({
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
        }
    } else if (condition === "gte") {
        if (rule.field !== data[rule.field] || data[rule.field] < rule.condition_value) {
            return re.status(400).json({
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
        }
    } else if (condition === "contains") {
        const fi = data[rule.field].toSting()
        const con = rule.condition_value.toSting()

        if (rule.field !== data[rule.field] || !fi.includes(con)) {
            return re.status(400).json({
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
        }
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