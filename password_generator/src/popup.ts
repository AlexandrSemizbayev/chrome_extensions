import { _$_ } from "./customQuery";

type TPossibleFlags = 'warning'|'error'|'success';

export class PopUp {
  public static idx = 0;
  timeout?:number;
  id: string;
  erasable: boolean;
  timeoutDuration: number;
  constructor(id: string, erasable = true, timeoutDuration = 2500) {
    PopUp.idx++;
    this.id = id;
    this.erasable = erasable;
    this.timeoutDuration = timeoutDuration;
  }
  static removeAll() {
    document.querySelectorAll('pop-up').forEach((el) => {
      el.remove();
    });
  }

  checkPresense() { return !!_$_(`#${this.id}`) }

  generate(flag: TPossibleFlags, text: string): HTMLElement {
    const popUpDiv = document.createElement('div');
    popUpDiv.classList.add(...['pop-up', flag]);
    popUpDiv.id = this.id;
    const popUpText = document.createElement('span');
    popUpText.classList.add('pop-up-text');
    popUpText.innerText = text;
    popUpDiv.appendChild(popUpText);
    return popUpDiv;
    
  }

  mount(generatedElement: HTMLElement) {
    generatedElement.classList.remove('fade');
    generatedElement.style.zIndex = String(PopUp.idx++);
    (_$_('body') as HTMLBodyElement)?.appendChild(generatedElement);
    if(this.erasable) {
      this.timeout = setTimeout(() => {
        this.unmount();
      },this.timeoutDuration);
    }
  }

  unmount(fastUnmount = false) {
    const element = _$_(`#${this.id}`) as HTMLElement;
    clearTimeout(this.timeout);
    return new Promise((resolve, _) => {
      const classList = `fade ${fastUnmount ? 'fade-fast' : ''}`.trim().split(' ');
      
      if(fastUnmount) {
        element.remove();
        resolve('animation skipped');
        return;
      }
      element?.classList.add(...classList);
      const removePopup = () => {
        element.classList.remove(...classList);
        element.remove();
        resolve(`${this.id} was sucessfully unmounted`);
      }
      element?.$on('transitionend', removePopup, {once: true});
      element?.$on('transitioncancel',removePopup);
    })
  }
}