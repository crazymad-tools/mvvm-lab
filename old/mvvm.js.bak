function Mvvm(options = {}) {
  this.$options = options;
  let data = this._data = this.$options.data;

  observe(data);

  for (let key in data) {
    Object.defineProperty(this, key, {
      configurable: true,
      get() {
        return this._data[key];
      },
      set(newVal) {
        this._data[key] = newVal;
      }
    })
  }

  initComputed.call(this);
  Compile('#app', this);
  options.mounted.call(this);
}

function initComputed() {
  let vm = this;
  let computed = this.$options.computed;
  for (let key in computed) {
    Object.defineProperty(vm, key, {
      get: typeof computed[key] === 'function' ? computed[key] : computed[key].get,
      set() { }
    });
  }
}

function Compile(el, vm) {
  vm.$el = document.querySelector(el);
  let fragment = document.createDocumentFragment();

  while (child = vm.$el.firstChild) {
    fragment.appendChild(child);
  }

  function replace(frag) {
    Array.from(frag.childNodes).forEach(node => {
      let txt = node.textContent;
      let reg = /\{\{(.*?)\}\}/g;

      if (node.nodeType === 3 && reg.test(txt)) {
        let val = RegExp.$1.split('.').reduce((val, key) => { return val[key] }, vm);

        node.textContent = txt.replace(reg, val).trim();

        new Watcher(vm, RegExp.$1, newVal => {
          node.textContent = txt.replace(reg, newVal).trim();
        })
      }
      if (node.nodeType === 1) {
        let nodeArr = node.attributes;
        Array.from(nodeArr).forEach(attr => {
          let name = attr.name;
          let exp = attr.value;
          if (name.includes('v-')) {
            node.value = vm[exp];
          }

          new Watcher(vm, exp, function (newVal) {
            node.value = newVal;
          });

          node.addEventListener('input', e => {
            let newVal = e.target.value;
            vm[exp] = newVal;
          })
        })
      }

      if (node.childNodes && node.childNodes.length) {
        replace(node);
      }
    })
  }

  replace(fragment);

  vm.$el.appendChild(fragment);
}

function Dep() {
  this.subs = [];
}
Dep.prototype = {
  addSub(sub) {
    this.subs.push(sub);
  },
  notify() {
    this.subs.forEach(sub => sub.update());
  }
}

function Watcher(vm, exp, fn) {
  this.fn = fn;
  this.vm = vm;
  this.exp = exp;
  Dep.target = this;
  // 在get的过程中，将状态监控push进去
  exp.split('.').reduce((val, key) => { return val[key] }, vm);
  Dep.target = null;
}
Watcher.prototype.update = function () {
  let val = this.exp.split('.').reduce((val, key) => { return val[key] }, this.vm);
  this.fn(val);
}

function Observe(data) {
  let dep = new Dep();
  for (let key in data) {
    let val = data[key];
    observe(val);
    Object.defineProperty(data, key, {
      configurable: true,
      get() {
        Dep.target && dep.addSub(Dep.target);
        return val;
      },
      set(newVal) {
        if (val === newVal) {
          return;
        }
        val = newVal;
        observe(newVal);
        dep.notify();
      }
    })
  }
}

function observe(data) {
  if (!data || typeof data !== 'object') return;

  return new Observe(data);
}