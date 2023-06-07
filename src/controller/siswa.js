const { Op } = require('sequelize')
const { siswas } = require('../../models')
const { users } = require('../../models')
const bcrypt = require('bcrypt')
const joi = require('joi')

exports.get = async (req, res) => {
    try {
        const auth = req.user;
        const isAdmin = auth.role === 'admin';
        const isSiswa = auth.role === 'siswa';
        let data = [];

        if (isAdmin) {
            data = await siswas.findAll();
            return res.render("siswas/index", {
                data: data,
                auth: auth,
            });
        } else if (isSiswa) {
            if (auth.kelas) {
                const kelasAuth = auth.kelas;
                data = await siswas.findAll({
                    where: { kelas: kelasAuth },
                });
                console.log(data)

                return res.render("siswas/siswa", {
                    data: data,
                    auth: auth,
                });
            } else {
                // Jika siswa tidak memiliki kelas, tambahkan logika lain sesuai kebutuhan Anda
                return res.render("siswas/siswa", {
                    data: data,
                    auth: auth,
                });
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Terjadi kesalahan server.");
    }
};

// exports.getAllMtk = async (req, res) => {
//     try {
//       const user = req.user;
//       const data = await siswas.findAll({
//         where: {
//           kelas: "Matematika",
//         },
//       });

//       const update = await siswas.findOne({
//         where: {
//           id: user,
//         },
//       });

//       res.render("siswas/mtk", { data: data, id: user, update: update });
//     } catch (err) {
//       console.error(err);
//     }
// };

// exports.getIpa = async (req, res) => {
//     try {
//       const user = req.user;
//       const data = await siswas.findAll({
//         where: {
//           kelas: "ipa",
//         },
//       });

//       const update = await siswas.findOne({
//         where: {
//           id: user,
//         },
//       });

//       res.render("siswas/ipa", { data: data, id: user, update: update });
//     } catch (err) {
//       console.error(err);
//     }
// };

// exports.getIps = async (req, res) => {
//     try {
//       const user = req.user;
//       const data = await siswas.findAll({
//         where: {
//           kelas: "ips",
//         },
//       });

//       const update = await siswas.findOne({
//         where: {
//           id: user,
//         },
//       });

//       res.render("siswas/ips", { data: data, id: user, update: update });
//     } catch (err) {
//       console.error(err);
//     }
// };

// exports.getBahasa = async (req, res) => {
//     try {
//       const user = req.user;
//       const data = await siswas.findAll({
//         where: {
//           kelas: "bahasa",
//         },
//       });

//       const update = await siswas.findOne({
//         where: {
//           id: user,
//         },
//       });

//       res.render("siswas/bahasa", { data: data, id: user, update: update });
//     } catch (err) {
//       console.error(err);
//     }
// };

// exports.getBela = async (req, res) => {
//     try {
//       const user = req.user;
//       const data = await siswas.findAll({
//         where: {
//           kelas: "bela diri",
//         },
//       });

//       const update = await siswas.findOne({
//         where: {
//           id: user,
//         },
//       });

//       res.render("siswas/bela", { data: data, id: user, update: update });
//     } catch (err) {
//       console.error(err);
//     }
// };

// exports.getTari = async (req, res) => {
//     try {
//       const user = req.user;
//       const data = await siswas.findAll({
//         where: {
//           kelas: "tari",
//         },
//       });

//       const update = await siswas.findOne({
//         where: {
//           id: user,
//         },
//       });

//       res.render("siswas/tari", { data: data, id: user, update: update });
//     } catch (err) {
//       console.error(err);
//     }
// };

exports.getPost = async (req, res) => {
    return res.render('siswas/create')
}

exports.post = async (req, res) => {
    try {
        const body = req.body

        const schema = joi.object({
            nama: joi.string().required(),
            email: joi.string().email().required(),
            tgl_lahir: joi.date().required(),
            kelas: joi.string().required(),
            tempat: joi.string().required(),
            no_telp: joi.string().required(),
            nama_orang_tua: joi.string().required(),
            no_ortu: joi.string().required(),
            password: joi.string().required(),
            alamat: joi.string().required(),
        })

        const { error } = schema.validate(body)
        if (error) {
            return res.render('siswas/create', {
                error: error.details[0].message,
            })
        }

        const data = await siswas.create({
            nama: body.nama,
            email: body.email,
            tgl_lahir: body.tgl_lahir,
            kelas: body.kelas,
            alamat: body.alamat,
            tempat: body.tempat,
            no_telp: body.no_telp,
            nama_orang_tua: body.nama_orang_tua,
            no_ortu: body.no_ortu,
        })
        const hash = await bcrypt.hash(body.password, 10)

        const dataSiswa = await users.create({
            username: body.nama,
            email: body.email,
            password: hash,
            role: 'siswa',
            kelas: body.kelas
        })

        console.log(data)
        console.log(dataSiswa)

        return res.redirect('/siswas')
    } catch (err) {
        console.error(err)
    }
}

exports.getEdit = async (req, res) => {
    try {
        const user = await siswas.findOne({
            where: {
                id: req.params.id
            }
        })
        console.log(user);
        res.render('siswas/edit', {
            data: user
        })
    } catch (err) {
        console.error(err)
    }
}

exports.edit = async (req, res) => {
    try {
        console.log("cek req body", req.body);
        const body = req.body
        const schema = joi.object({
            nama: joi.string().required(),
            tgl_lahir: joi.date().required(),
            kelas: joi.string().required(),
            alamat: joi.string().required(),
            tempat: joi.string().required(),
            no_telp: joi.string().required(),
            nama_orang_tua: joi.string().required(),
            no_ortu: joi.string().required(),
            alamat: joi.string().required(),
        })
        const { error } = schema.validate(body)
        if (error) {
            return res.send({
                error: error.details[0].message
            })
        }

        const data = await siswas.findOne({
            where: {
                id: req.params.id
            }
        })

        const update = await data.update({
            nama: body.nama,
            email: body.email,
            tgl_lahir: body.tgl_lahir,
            kelas: body.kelas,
            alamat: body.alamat,
            tempat: body.tempat,
            no_telp: body.no_telp,
            nama_orang_tua: body.nama_orang_tua,
            no_ortu: body.no_ortu,
        }, {
            where: {
                id: req.params.id
            },
            returning: true
        })
        console.log(update)

        return res.redirect('/siswas')
    } catch (err) {
        console.error(err)
    }
}

exports.delete = async (req, res) => {
    try {
        const getId = await siswas.findOne({
            where: {
                id: req.params.id
            }
        })

        if (!getId) {
            return res.status(404).send({
                message: 'id tidak ditemukan'
            })
        }

        const del = await siswas.destroy({
            where: {
                id: req.params.id
            }
        })

        return res.redirect('/siswas')
    } catch (err) {
        console.error(err)
    }
}