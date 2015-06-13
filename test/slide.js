'use strict';

import assert from 'power-assert';
import sinon from 'sinon';
import slide from '../src/slide';

describe('slide', function() {
  let mdtext = `
<script id="md" layout="test" class="test" type="text/x-markdown">
# h1
## h2

paragprah<br>
paraparag

----

### h3 note
</script>
`;

  it('comipleMarkdown', function() {
    document.body.insertAdjacentHTML('beforeend', mdtext);

    let section = slide.compileMarkdown(document.getElementById('md'));

    assert(!!section.querySelector('h1'));
    assert(!!section.querySelector('h2'));
    assert(!!section.querySelector('h3'));
    assert(!!section.querySelector('p'));
    assert(!!section.querySelector('br')); // should not escape pure html

    section.parentNode.removeChild(section);
  });

  it('extend attributes after compile', function() {
    document.body.insertAdjacentHTML('beforeend', mdtext);

    let section = slide.compileMarkdown(document.getElementById('md'));

    assert(section.getAttribute('id') === 'md');
    assert(section.getAttribute('layout') === 'test');
    assert(section.getAttribute('class') === 'test');
    assert(!section.getAttribute('type'));

    section.parentNode.removeChild(section);
  });

  it('extract Note', function() {
    document.body.insertAdjacentHTML('beforeend', mdtext);

    let section = slide.compileMarkdown(document.getElementById('md'));
    let noteStr = slide.extractNote(section);

    // got note (tags are stripped)
    assert(noteStr === 'h3 note\n');

    // extracted
    assert(!section.querySelector('h3'));

    section.parentNode.removeChild(section);
  });

});
