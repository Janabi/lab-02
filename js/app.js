function loadingPageTwo() {
    $('main').html('');
    Animal.all = [];
    let keywords = [];
    let defaultL = $('#kw-sort option').first();
    $('#kw-sort').html('');
    $('#kw-sort').append(defaultL);
    $('#sort').val('default');
    $.ajax('./data/page-2.json')
    .then(data=> {
        data.forEach((value) =>{
            if (!keywords.includes(value.keyword)) {
                keywords.push(value.keyword);
            }
            let newAnimal = new Animal(value);

            newAnimal.render();
        });
        fillFilterList(keywords);
        sortingKeyword();
    });
}


function loadingPageOne() {
    $('main').html('');
    Animal.all = [];
    let keywords = [];
    let defaultL = $('#kw-sort option').first();
    $('#kw-sort').html('');
    $('#kw-sort').append(defaultL);
    $('#sort').val('default');
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
        sortingKeyword();
    });
}

$('#page1').on('click', loadingPageOne);
$('#page2').on('click', loadingPageTwo);

Animal.all = [];
function Animal(data) {
    this.title = data.title;
    this.url = data.image_url;
    this.description = data.description;
    this.keyword = data.keyword;
    this.horns = data.horns;
    Animal.all.push(this);
}

Animal.prototype.render = function() {
    // let animalTemplate = $('#photo-template').first().clone();

    // animalTemplate.find('h2').text(this.title);
    // animalTemplate.find('img').attr('src', this.url);
    // animalTemplate.find('p').text(this.description);
    // $('main').append(animalTemplate);
    let animalTemplate = $("#main").html();
    let showHtml = Mustache.render(animalTemplate, this);
    $('.clearfix').append(showHtml);
}

function fillFilterList(keywords){
    console.log(keywords)
    keywords.forEach(kw => {
        let option = $(`<option></option>`);
        option.attr('value', kw);
        option.text(kw);
        $('#kw-sort').append(option);
    });
}

function sortingKeyword() {
    $('#kw-sort').on('change', function(){
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
}


    $('#sort').on('change', function(){
        let sortFilter = $(this).val();
        if (sortFilter !== 'default') {
            $('main').html('');
            if (sortFilter === 'title') {
                Animal.all.sort((a, b) => {
                    if (a.title.toUpperCase() < b.title.toUpperCase()) {
                        return 1;
                    } else if (a.title.toUpperCase() > b.title.toUpperCase()) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
            }
            if (sortFilter === 'numHorn') {
                Animal.all.sort((a, b) => {
                    if (a.horns < b.horns) {
                        return -1;
                    } else if (a.horns > b.horns) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
            }
            Animal.all.forEach(animal => {
                animal.render();
            });
            
            $('footer').addClass('sticky-footer');
        } 
    });

