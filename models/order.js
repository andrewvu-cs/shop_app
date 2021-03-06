import moment from 'moment';

class Order {
  constructor(id, items, totalAmount, date) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }

  get readableDate() {
    // WORKS FOR iOS BUT ANDROID DOES NOT SUPPORT IT
    // return this.date.toLocaleDateString('en-EN',{
    //   year: 'numeric',
    //   month: 'numeric',
    //   day: 'numeric',
    //   hour: '2-digit',
    //   minute: '2-digit'
    // });
    return moment(this.date).format('MMMM Do YYYY, hh:mm');
  }
}

export default Order;
