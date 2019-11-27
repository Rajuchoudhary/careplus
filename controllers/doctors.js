//@desc         Get All Doctors
//@route        GET /api/v1/bootcamps
//@access       Public
exports.getDoctors = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'show all doctros' });
};

//@desc         Get Single Doctors
//@route        GET /api/v1/bootcamps/:id
//@access       Public
exports.getDoctor = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show single doctor porfile' });
};

//@desc         Register new Doctor
//@route        POST /api/v1/bootcamps/
//@access       Public
exports.registerDoctor = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'regsiter new doctor' });
};

//@desc         Update Doctor Profile
//@route        PUT /api/v1/bootcamps/:id
//@access       Private
exports.updateDoctor = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Updated doctor profile id: ${req.params.id}`
  });
};

//@desc         Delete Doctor Profile
//@route        DELETE /api/v1/bootcamps/:id
//@access       Private
exports.deleteDoctor = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `Deleted doctor profile id: ${req.params.id}`
  });
};
