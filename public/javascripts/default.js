function machine_template(m_obj) {
  var html = "<div class=\"coffee_machine\" data-machine-id=\"" + m_obj.id + "\">" +
  "<div class=\"main\"><h3>" + m_obj.attributes.model + "</h3><p>" + m_obj.attributes.description + "</p></div>" +
  "<ul><li>size: " + m_obj.attributes.size + "</li><li>sku: " + m_obj.attributes.sku + "</li></ul>" +
  "<ul><li>beverage: " + m_obj.attributes.beverage + "</li>" +
  "<li>water line: " + m_obj.attributes.water_line_compatible + "</li></ul></div>"
  return html
}

function pod_template(m_obj) {
  var html = "<div class=\"coffee_pod\">" +
  "<div class=\"main\"><h3>" + m_obj.attributes.flavor + "</h3><p>" + m_obj.attributes.size + "</p></div>" +
  "<ul><li>sku: " + m_obj.attributes.sku + "</li><li>quantity: " + m_obj.attributes.quantity + " dozen</li>" +
  "<li>beverage: " + m_obj.attributes.beverage + "</li></ul></div>"
  return html
}

$(function() {
  $('.pod_list').hide()

  $('#search_by_type').on('change', function(e){
    $('.pod_list').hide()
    $('.machine_list').empty().show()
    var filter = $(e.currentTarget).val()
    var get_pods = $.ajax({
      url: "http://localhost:3000/model/" + filter
    }).done(function(resp){
      $.each(resp.data, function( index, value ) {
        $('.machine_list').append(machine_template(value))
      })
    })
  })

  $(document).on('click', '.coffee_machine', function(e){
    $('.pod_container').empty()
    $('.coffee_machine').remove()
    var machine_id = $(e.currentTarget).data('machine-id')
    var get_pods = $.ajax({
      url: "http://localhost:3000/machines/" + machine_id
    }).done(function(resp){
      $('.machine_list').hide()
      $('.pod_list').show()
      console.log(resp)
      $('.pod_list').append(machine_template(resp.data))
      $.each(resp.included, function( index, value ) {
        $('.pod_container').append(pod_template(value))
      })
    })
  })

  var get_machines = $.ajax({
    url: "http://localhost:3000/"
  }).done(function(resp){
    $.each(resp.data, function( index, value ) {
      $('.machine_list').append(machine_template(value))
    })
  })
})
