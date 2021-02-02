## Gabarito dos exercícios

A seguir encontra-se uma sugestão de solução para o exercício proposto.

##### Solução

1. Crie o model de `Plans`;
2. Crie o model de `Patients`;
3. Crie o model de `Surgeries`;
4. Crie o model de `Patient_surgeries`;
5. Crie um endpoint que liste todos os pacientes e seus respectivos planos;
6. Crie um endpoint que liste todos os pacientes e suas respectivas cirurgias realizadas;
7. Crie um endpoint que de acordo com o `id` de um plano, que deve ser recebido via requisição, liste os pacientes que o possuem.

##### Bônus

8. Crie um endpoint capaz de adicionar um novo paciente;
9. Crie um endpoint que liste todos os pacientes e suas cirurgias realizadas, mas oculte o nome do médico responsável;
10. Crie um endpoint que de acordo com o nome do médico, que deve ser recebido via requisição, liste todas as cirurgias realizadas pelo mesmo, um get na url `http://localhost:3000/surgeries/Rey%20Dos%20Santos`deve retornar as cirurgias realizadas pelo médico `Rey Dos Santos`.

> index.js

```language-javascript
const {
getAllPatientsPlans,
getAllPatientsSurgeries,
createPatients,
getPatientsAndSurgeriesNoDoctor,
} = require('./controllers/patientsController');
const getAllPlans = require('./controllers/plansController');
const getDoctorSurgeries = require('./controllers/surgeriesController');
const bodyParser = require('body-parser');

const express = require('express');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', createPatients)
app.get('/all', getAllPatientsPlans);
app.get('/surgeries', getAllPatientsSurgeries);
app.get('/surgeries/nodoctor', getPatientsAndSurgeriesNoDoctor);
app.get('/surgeries/:name', getDoctorSurgeries);
app.get('/:id', getAllPlans);

const PORT = 3000;

app.listen(PORT, () => {
console.log(`Port: ${PORT}`);
});
```

> models/Plans.js

```language-javascript
const Plans = (sequelize, DataTypes) => {
const Plans = sequelize.define('Plans', {
plan_id: { type: DataTypes.INTEGER, primaryKey: true },
coverage: DataTypes.STRING,
price: DataTypes.DOUBLE,
},
{
timestamps: false});
Plans.associate = (models) => {
Plans.hasMany(models.Patients, { foreignKey: 'plan_id', as: 'patients' });
};
return Plans;
};

module.exports = Plans;
```

> models/Patients.js

```language-javascript
const Patients = (sequelize, DataTypes) => {
const Patients = sequelize.define('Patients', {
patient_id: {
type: DataTypes.INTEGER,
primaryKey: true,
autoIncrement: true,
},
fullname: DataTypes.STRING,
plan_id: { type: DataTypes.INTEGER, foreignKey: true },
},
{
timestamps: false});
Patients.associate = (models) => {
Patients.belongsTo(models.Plans, { foreignKey: 'plan_id', as: 'plan' });
};
return Patients;
};

module.exports = Patients;
```

> models/Surgeries.js

```language-javascript
const Surgeries = (sequelize, DataTypes) => {
const Surgeries = sequelize.define('Surgeries', {
surgery_id: { type: DataTypes.INTEGER, primaryKey: true },
specialty: DataTypes.STRING,
doctor: DataTypes.STRING,
},
{
timestamps: false});
return Surgeries;
};

module.exports = Surgeries;
```

> models/Patient_surgeries.js

```language-javascript
const Patient_surgeries = (sequelize, DataTypes) => {
const Patient_surgeries = sequelize.define(
'Patient_surgeries',
{},
{ timestamps: false }
);

Patient_surgeries.associate = (models) => {
models.Surgeries.belongsToMany(models.Patients, {
as: 'patients',
through: Patient_surgeries,
foreignKey: 'surgery_id',
otherKey: 'patient_id'});
models.Patients.belongsToMany(models.Surgeries, {
as: 'surgeries',
through: Patient_surgeries,
foreignKey: 'patient_id',
otherKey: 'surgery_id'});
};

return Patient_surgeries;
};

module.exports = Patient_surgeries;
```

> controllers/patientsController.js

```language-javascript
const { Patients, Plans, Surgeries } = require('../models');

const getAllPatientsPlans = (\_req, res) =>
Patients.findAll({ include: { model: Plans, as: 'plan' } })
.then((listOfPatients) => {
if (!listOfPatients.length) {
return res.status(404).send({ message: 'No patients found' });
}
return res.status(200).json(listOfPatients);
})
.catch(() => {
return res.status(500).json({ message: 'Algo deu errado' });
});

const getAllPatientsSurgeries = (\_req, res) =>
Patients.findAll({
include: { model: Surgeries, as: 'surgeries', through: { attributes: [] } }
})
.then((listOfPatients) => {
if (!listOfPatients.length) {
return res.status(404).send({ message: 'No patients found' });
}
return res.status(200).json(listOfPatients);
})
.catch(() => {
return res.status(500).json({ message: 'Algo deu errado' });
});

const getPatientsAndSurgeriesNoDoctor = (\_req, res) =>
Patients.findAll({
include: {
model: Surgeries,
as: 'surgeries',
attributes: { exclude: ['doctor'] },
through: { attributes: [] }
}
})
.then((listOfPatients) => {
if (listOfPatients === null) {
return res.status(404).send({ message: 'No patients found' });
}

      return res.status(200).json(listOfPatients);
    })
    .catch(() => res.status(500).json({ message: 'Algo deu errado' }));

const createPatients = (req, res) => {
const { fullname, plan_id } = req.body;
Patients.create({ fullname, plan_id })
.then((response) =>res.status(200).json(response))
.catch(() => res.status(500).json({ message: 'Algo deu errado' }));
};

module.exports = {
getAllPatientsPlans,
getAllPatientsSurgeries,
createPatients,
getPatientsAndSurgeriesNoDoctor,
};
```

> controllers/plansController.js

```language-javascript
const { Patients, Plans } = require('../models');

const getAllPlans = (req, res) =>
Plans.findAll({
where: { plan_id: req.params.id },
include: [{ model: Patients, as: 'patients' }]
})
.then((listOfPatients) => {
if (!listOfPatients.length) {
return res.status(404).send({ message: 'No plan found' });
}
return res.status(200).json(listOfPatients);
})
.catch(() => {
return res.status(500).json({ message: 'Algo deu errado' });
});

module.exports = getAllPlans;
```

> controllers/surgeriesController.js

```language-javascript
const { Patients, Surgeries } = require('../models');

const getDoctorSurgeries = (req, res) =>
Surgeries.findAll({
where: { doctor: req.params.name },
include: [{ model: Patients, as: 'patients', through: { attributes: [] } }]
})
.then((listOfPatients) => {
if (listOfPatients === null) {
return res.status(404).send({ message: 'No plan found' });
}

      return res.status(200).json(listOfPatients);
    })
    .catch(() => res.status(500).json({ message: 'Algo deu errado' }));

module.exports = getDoctorSurgeries;
```
