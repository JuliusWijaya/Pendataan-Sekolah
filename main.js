const editData = async (id, nama_sekolah, kepala_sekolah, akreditasi, tahun_berdiri, jumlah_siswa) => {
  document.getElementById('nama_sekolah').value = nama_sekolah;
  document.getElementById('kepala_sekolah').value = kepala_sekolah;
  document.getElementById('akreditasi').value = akreditasi;
  document.getElementById('tahun_berdiri').value = tahun_berdiri;
  document.getElementById('jumlah_siswa').value = jumlah_siswa;
  document.getElementById('btn').innerText = 'Update';
  document.getElementById('btn').setAttribute('onclick', `updateData(${id})`);
};

const updateData = async (id) => {
  let nama = document.getElementById('nama_sekolah').value;
  let kepala = document.getElementById('kepala_sekolah').value;
  let akreditasi = document.getElementById('akreditasi').value;
  let tahun = document.getElementById('tahun_berdiri').value;
  let jumlah = document.getElementById('jumlah_siswa').value;

  let konfirmasi = 'Serius nama sekolah ' + nama + ' Akan diupdate ?';

  if (confirm(konfirmasi)) {
    await axios
      .patch(`http://103.163.110.11:3031/schools/${id}`, {
        nama_sekolah: nama,
        kepala_sekolah: kepala,
        akreditasi: akreditasi,
        tahun_berdiri: tahun,
        jumlah_siswa: jumlah,
      })

      .then((Response) => {
        alert('Data Sekolah berhasil diedit');
        document.getElementById('nama_sekolah').value = '';
        document.getElementById('kepala_sekolah').value = '';
        document.getElementById('akreditasi').value = '';
        document.getElementById('tahun_berdiri').value = '';
        document.getElementById('jumlah_siswa').value = '';
        getSchool();
        console.log(Response);
      })

      .catch((error) => {
        console.log(error.message);
      });
  }
};

const deleteData = async (id) => {
  let konfirmasi = 'Seriusan Data Mau Dihapus ?';
  if (confirm(konfirmasi)) {
    await axios
      .delete(`http://103.163.110.11:3031/schools/${id}`)
      .then((Response) => {
        alert('Data Berhasil Dihapus');
        getSchool();
        console.log(Response);
      })

      .catch((error) => {
        console.log(error.message);
      });
  }
};

const saveData = async () => {
  let nama = document.getElementById('nama_sekolah').value;
  let kepala = document.getElementById('kepala_sekolah').value;
  let akreditasi = document.getElementById('akreditasi').value;
  let tahun = document.getElementById('tahun_berdiri').value;
  let jumlah_siswa = document.getElementById('jumlah_siswa').value;

  // Validasi
  if (nama == '' || kepala == '' || akreditasi == '' || tahun == '' || jumlah_siswa == '') {
    alert('Inputan Harus Terisi Semua');
  } else {
    await axios
      .post(`http://103.163.110.11:3031/schools`, {
        nama_sekolah: nama,
        kepala_sekolah: kepala,
        akreditasi: akreditasi,
        tahun_berdiri: tahun,
        jumlah_siswa: jumlah_siswa,
      })

      .then((Response) => {
        alert('Data Berhasil Disimpan');
        getSchool();
        document.getElementById('nama_sekolah').value = '';
        document.getElementById('kepala_sekolah').value = '';
        document.getElementById('akreditasi').value = '';
        document.getElementById('tahun_berdiri').value = '';
        document.getElementById('jumlah_siswa').value = '';
        console.log(Response);
      })

      .catch((error) => {
        console.log(error.message);
      });
  }
};

const getSchool = async () => {
  await axios
    .get(`http://103.163.110.11:3031/schools`)
    .then((Response) => {
      let datas = ``;
      let schools = Response.data;

      if (schools.length > 0) {
        for (let i = 0; i < schools.length; i++) {
          datas += `
                      <tr>
                          <td class="text-center">${i + 1}</td>
                          <td>${schools[i].nama_sekolah}</td>
                          <td>${schools[i].kepala_sekolah}</td>
                          <td class="text-center">${schools[i].akreditasi}</td>
                          <td>${schools[i].tahun_berdiri}</td>
                          <td>${schools[i].jumlah_siswa}</td>
                          <td class="text-center">
                            <button onclick="editData(
                            '${schools[i].id}', 
                            '${schools[i].nama_sekolah}', 
                            '${schools[i].kepala_sekolah}',
                            '${schools[i].akreditasi}', 
                            '${schools[i].tahun_berdiri}',
                            '${schools[i].jumlah_siswa}')"
                             class="btn btn-warning btn-sm"
                             data-bs-toggle="modal"
                             data-bs-target="#exampleModal">
                              Edit
                            </button>
                            <button onclick="deleteData(${schools[i].id})" class="btn btn-danger btn-sm">Delete</button>
                          </td>
                      </tr>
                     
                  `;
        }
      } else {
        datas += `
              <tr>
                  <td colspan="8" style="text-align: center; color: red">Data Tidak Ada</td>
              </tr>
          `;
      }
      document.getElementById('result').innerHTML = datas;
    })

    .catch((error) => {
      let datas = `
              <tr>
                  <td colspan="8" style="text-align: center; color: red">${error.message}</td>
              </tr>
       `;
      document.getElementById('result').innerHTML = datas;
    });
};

getSchool();
