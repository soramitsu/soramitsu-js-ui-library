Tasks:

- компоненты для самих алертов и нотификаций - разные типы (success/error/etc), title, description, slot. У нотификации ещё возможность установить таймаут.
- апи для открытия нотификаций из js:

  ```ts
  import { useNotifications } from 'sora'

  const { show } = useNotifications()

  function onClick() {
    const {
      /* particular notification api such as close(), onClose() etc */
    } = show({
      title: 'MyTitle',
      type: 'success',
      timeout: 3000,
      closeBtn: true,

      description: 'My very long description',

      // or super-customizable slots
      defaultSlot: () => ['Desc', h('button', {}, 'my btn')],
      titleSlot: () => 'My title',

      // maybe on-close event
      // onClose() {}
    })
  }
  ```

- Возможность показа нотификации через компонент?

  ```html
  <template>
    <UseNotification v-model:show="showSuccess" timeout="5000" title="Success" type="Success">
      All is ok!
      <SButton>OK</SButton>

      <!-- or title slot -->
      <template #title> Title via slot </template>
    </UseNotification>
  </template>
  ```

- Возможность монтировать нотификации в любом углу:

  ```html
  <template>
    <SNotificationProviderOpinionated placement="top-right"> ... </SNotificationProviderOpinionated>
  </template>
  ```

- Возможность кастомизировать место, куда рендерятся нотификации:

  ```html
  <template>
    <SNotificationProvider>
      <!-- use mount component -->
      <Teleport to="#custom">
        <SNotificationMount placement="bottom-right">
          <SNotificationList />
        </SNotificationMount>
      </Teleport>

      <!-- just mount anywhere you want -->
      <div id="detached"></div>
      <Teleport :disabled="inPlace" to="#detached">
        <SNotificationList />
      </Teleport>
    </SNotificationProvider>
  </template>
  ```

Компоненты:

- Alert - просто алерт, особого вида компонент, без всякой логики
- Notification - макет для отображение самой нотификации. Чистое отображение
- UseNotification - компонент-утилита, которая позволяет декларативно рендерить Notification в рамках некоего отрисовщика.
- NotificationProvider - провайдер апи нотификаций. Кроме этого ничего не делает. А нужен ли, если есть обобщённый провайдер?
- **FixedSettle** - знает, как расположить себя и своих потомков где-нибудь на экране. absolute/bool(optional), placement/top-bottom-left-etc(required), to/teleport-target(optional)
- ?? **FunctionalComponentListProvider** - обобщённый провайдер списка функциональных компонентов. Может становиться частью вышестоящих провайдеров, таким образом соединяя между собой разные списки. То есть можно будет разные источники объединять в единый рендер-список - например, рендерить в одном место и сообщение, и алерты. Проблемы:
  - Для конечного пользователя может быть головной болью впадать во все эти детали. Хотелось бы один провайдер налепить, а дальше уже использовать. Надо сделать проще! `SToastsProvider`?

Или...

- Тостовая база
  - SToastsProvider - провайдер тостов. Универсальный. Может, однако, провайдить своё АПИ сразу через несколько ключей вниз - таким образом можно будет совместить разные типы тостов.
  - SToastsDisplay - берёт на себя как расположение на экране (в каком углу, абсолютно/фиксированно etc), так и отрисовку списка и анимации.\
- Нотификации
  - SNotificationProvider - это SToastsProvider + SToastsDisplay со своим ключом
  - SNotificationLook - сама нотификация
- (в будущем) Сообщение
  - SMessageProvider = SToastsProvider + SToastsDisplay

Использование:

```html
<SNotificationProvider to="body" placement="bottom-right">
  <!-- something -->
  <UseNotification show> Hallo! </UseNotification>
</SNotificationProvider>
```

Если нужно совместить разное:

```vue
<script setup>
import { S_NOTIFICATION_API_KEY, S_MESSAGE_API_KEY } from 'lib'
</script>

<template>
  <SToastsProvider :via="[S_NOTIFICATION_API_KEY, S_MESSAGE_API_KEY]">
    <UseMessage show>Msg</UseMessage>
    <UseNotification show>Notification</UseMessage>

    <SToastsDisplay placement="top" to="body" />
  </SToastsProvider>
</template>
```
