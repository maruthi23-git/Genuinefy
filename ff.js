function scanBarcode() {
  const fileInput = document.getElementById('barcodeImage');
  const preview = document.getElementById('preview');
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a barcode image.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const image = new Image();
    image.onload = function () {
      preview.src = image.src;
      preview.style.display = 'block';

      const canvas = document.getElementById('barcodeCanvas');
      const ctx = canvas.getContext('2d');
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      Quagga.decodeSingle({
        src: canvas.toDataURL(),
        numOfWorkers: 0,
        inputStream: {
          size: 800
        },
        decoder: {
          readers: ["ean_reader", "code_128_reader"]
        }
      }, function (result) {
        if (result && result.codeResult) {
          const barcode = result.codeResult.code;
          document.getElementById("barcodeInput").value = barcode;
          checkProduct();
        } else {
          alert("❌ Barcode not detected. Try another image.");
        }
      });
    };
    image.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function checkProduct() {
  const input = document.getElementById("barcodeInput").value.trim();
  const resultDiv = document.getElementById("result");

  resultDiv.className = "";

  fetch(`http://localhost:3000/check-product/${input}`)
    .then(res => res.json())
    .then(data => {
      if (data.found) {
        const product = data.product;
        resultDiv.classList.add("original");
        resultDiv.innerHTML = `
          ✅ <strong>Product Found!</strong><br><br>
          <strong>Name:</strong> ${product.name}<br>
          <strong>Brand:</strong> ${product.brand}<br>
          <strong>Manufacture Date:</strong> ${product.manufactureDate}<br>
          <strong>Expiry Date:</strong> ${product.expiryDate}<br>
          <strong>Status:</strong> Original ✔️
        `;
      } else {
        resultDiv.classList.add("fake");
        resultDiv.innerHTML = `
          ❌ <strong>No product found.</strong><br><br>
          The barcode <strong>${input}</strong> does not match any verified product in our system.
        `;
      }
      resultDiv.style.display = "block";
    })
    .catch(err => {
      console.error("Error:", err);
      alert("❌ Failed to fetch product info.");
    });
}
