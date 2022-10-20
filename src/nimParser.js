const nimParserJSON = require("../public/nimParser.json");

const nimParser = (nim) => {
  const data = {
    nim,
    fakultas: nim.substring(0, 2),
    jurusan: nim.substring(0, 4),
    jalurMasuk: nim.substring(4, 7),
    masaPerkuliahan: nim.substring(7, 11),
    urutanMahasiswa: nim.substring(11, 14),
  };

  const result = `
NIM   : ${data.nim}

${[data.fakultas]}      : Fakultas ${nimParserJSON.fakultas[data.fakultas]}
${nim.substring(2, 4)}      : Program studi ${
    nimParserJSON.jurusan[data.jurusan]
  }
${[data.jalurMasuk]}    : Jalur masuk ${
    nimParserJSON.jalurMasuk[data.jalurMasuk]
  }
${[
  data.masaPerkuliahan,
]}  : Rentang masa perkuliahan 20${data.masaPerkuliahan.substring(
    0,
    2
  )} - 20${data.masaPerkuliahan.substring(2, 4)}
${[data.urutanMahasiswa]}    : Nomor urut pendaftaran mahasiswa`;

  return result.replace(new RegExp("undefined", "gi"), "tidak ditemukan");
};

module.exports = { nimParser };
