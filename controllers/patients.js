const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Patient = require('../models/Patient');

//@desc         Get All Patients
//@route        GET /api/v1/patients/
//@access       Public
exports.getPatients = asyncHandler(async (req, res, next) => {
  const patients = await Patient.find();

  if (!patients) {
    return res.status(400).json({ success: false, data: {} });
  }

  res
    .status(200)
    .json({ success: true, count: patients.length, data: patients });
});

//@desc         Get Single Patient
//@route        GET /api/v1/patients/:id
//@access       Public
exports.getPatient = asyncHandler(async (req, res, next) => {
  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    return next(
      new ErrorResponse(
        `Patient profile with id of ${req.params.id} not found`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: patient });

  res.status();
});

//@desc         Register Patient
//@route        POST /api/v1/patients/
//@access       Public
exports.registerPatient = asyncHandler(async (req, res, next) => {
  const patient = await Patient.create(req.body);

  if (!patient) {
    return next(
      new ErrorResponse(
        `Patient profile with id of ${req.params.id} not found`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: patient });
});

//@desc         Update Single Patient
//@route        PUT /api/v1/patients/:id
//@access       Private
exports.updatePatient = asyncHandler(async (req, res, next) => {
  const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!patient) {
    return next(
      new ErrorResponse(
        `Patient profile with id of ${req.params.id} not found`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: patient });
});

//@desc         Delete Single Patient
//@route        DELETE /api/v1/patients/:id
//@access       Private
exports.deletePatient = asyncHandler(async (req, res, next) => {
  const patient = await Patient.findByIdAndDelete(req.params.id);

  if (!patient) {
    return next(
      new ErrorResponse(
        `Patient profile with id of ${req.params.id} not found`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: {} });
});
