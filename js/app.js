let keywords = [];
$.ajax('./data/page-1.json')
.then(data=> {
    data.forEach((value) =>{
        if (!keywords.includes(value.keyword)) {
            keywords.push(value.keyword);
        }
        let newAnimal = new Animal(value);

        newAnimal.render();
    });
    fillFilterList(keywords);
});

Animal.all = [];
function Animal(data) {
    this.title = data.title;
    this.url = data.image_url;
    this.description = data.description;
    this.keyword = data.keyword;
    Animal.all.push(this);
}

Animal.prototype.render = function() {
    let animalTemplate = $('#photo-template').first().clone();

    animalTemplate.find('h2').text(this.title);
    animalTemplate.find('img').attr('src', this.url);
    animalTemplate.find('p').text(this.description);
    $('main').append(animalTemplate);
}

function fillFilterList(keywords){
    console.log(keywords)
    keywords.forEach(kw => {
        let option = $(`<option></option>`);
        option.attr('value', kw);
        option.text(kw);
        $('select').append(option);
    });
}

$('select').on('change', function(){
    let animalFilter = $(this).val();
    if (animalFilter !== 'default') {
        let animalTemplate = $('#photo-template').first();
        $('main').html('');
        $('main').append(animalTemplate);
        Animal.all.forEach(animal => {
            if (animal.keyword === animalFilter) {
                console.log(animal);
                animal.render();
            }
        });
        $('footer').addClass('sticky-footer');
    } else {
        let animalTemplate = $('#photo-template').first();
        $('main').html('');
        $('main').append(animalTemplate);
        Animal.all.forEach(animal => {
            animal.render();
        });
        $('footer').removeClass('sticky-footer');
    }
    
});