'use strict';

describe('markdown', function() {
  let markdown = Talkie({api:true}).markdown;
  let mdtext = `
<script id="md" layout="test" class="test" type="text/x-markdown">
# h1
## h2

paragprah
</script>
`;

  it('apply', function() {
    document.body.insertAdjacentHTML('beforeend', mdtext);

    let section = markdown(document.getElementById('md'));

    assert(!!section.querySelector('h1'));
    assert(!!section.querySelector('h2'));
    assert(!!section.querySelector('p'));

    section.parentNode.removeChild(section);
  });

  it('extend attributes', function() {
    document.body.insertAdjacentHTML('beforeend', mdtext);

    let section = markdown(document.getElementById('md'));

    assert(section.getAttribute('id') === 'md');
    assert(section.getAttribute('layout') === 'test');
    assert(section.getAttribute('class') === 'test');
    assert(!section.getAttribute('type'));

    section.parentNode.removeChild(section);
  });

});
