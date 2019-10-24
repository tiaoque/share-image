var stream = require('stream');

const db = require('../config/db.config.js');
const File = db.files;
const crypto = require('crypto');

exports.uploadFile = (req, res) => {
	
	// 可任意多次调用update():
	if (req.body.auth) {
		const hash = crypto.createHash('md5');
		hash.update(req.body.auth)
		console.log(req.body.auth)
		if(!(hash.digest('hex') === '46c1b534ac3f9b573263fd8cdf955dfa')) {
			res.json({msg: 'Error', detail: 'auth failed'});
			return false;
		}
	} else {
		return false
	}	
	File.create({
		type: req.file.mimetype,
		name: req.file.originalname,
		data: req.file.buffer
	}).then(() => {
		res.json({msg:'File uploaded successfully! -> filename = ' + req.file.originalname});
	}).catch(err => {
		console.log(err);
		res.json({msg: 'Error', detail: err});
	});
}

exports.listAllFiles = (req, res) => {
	File.findAll({attributes: ['id', 'name']}).then(files => {
	  res.json(files);
	}).catch(err => {
		console.log(err);
		res.json({msg: 'Error', detail: err});
	});
}

exports.downloadFile = (req, res) => {
	File.findById(req.params.id).then(file => {
		var fileContents = Buffer.from(file.data, "base64");
		var readStream = new stream.PassThrough();
		readStream.end(fileContents);
		// res.set('Content-disposition', 'attachment; filename=' + file.name);
		// res.set('Content-Type', file.type);
		res.attachment(file.name)

		readStream.pipe(res);
	}).catch(err => {
		console.log(err);
		res.json({msg: 'Error', detail: err});
	});
}