/*jshint esversion: 6 */

export default function(){

  let duration = 600;
  this.transition(
    this.fromRoute('index'),
    this.toRoute('polls'),
    this.use('toLeft', { duration }),
    this.reverse('toRight', { duration })
  );
}
