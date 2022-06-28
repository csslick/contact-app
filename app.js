
let customers = [
  {
    name: "홍길동",
    tel: "010-000-0001",
  },
  {
    name: "나길동",
    tel: "010-000-0002",
  },
  {
    name: "이제인",
    tel: "010-000-0003",
  },
];

function updateList() {

  // 데이터 로드
  getCustomerData();

  $('#list ul').empty();
  
  customers.forEach(customer => {
    let html = `
      <li>
        <div class="user-icon">
          <i class="bi bi-person-circle"></i>
        </div>
        <div class="user-info">
          <span>${customer.name}</span>
          <span>${customer.tel}</span>
        </div>
        <a href="tel:${customer.tel}">
          <i class="bi bi-telephone-fill"></i>
        </a>  
      </li>
    `;
    $('#list ul').append(html);
  });
}

function getCustomerData() {
  let data = JSON.parse(localStorage.getItem('customers'));
  if(data) {
    console.log('data 로딩 성공')
    console.log(data);
    customers = data;
  } else {
    console.log('no data');
  }
}

function saveData() {
  localStorage.setItem('customers', JSON.stringify(customers));
}

$('#saveForm').submit(function(){
  let obj = {
    name: $('#name').val(),
    tel: $('#tel').val()
  }

  customers.push(obj);
  console.log('추가 = ', customers)
  saveData();
  updateList();
  return false;
})

updateList();

// 삭제
$(document).on('click', '#list ul li .user-icon', function(){
  let i = $(this).parent().index();
  console.log(i);
  let c = confirm('연락처 삭제?');
  if(c) {
    customers.splice(i, 1);
  }

  saveData();
  updateList();
});