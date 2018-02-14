# Promise React Component

A utility React component that renders its contents based on lifecycle state of a specified Promise

## Installation

```bash
$ npm install --save promise-react-component
```

Or:

```bash
$ yarn add --save promise-react-component
```

## Usage

Simple example:

```javascript
import PromiseComponent from 'promise-react-component';
// ...

return (
  <PromiseComponent
    promise={myApi.fetchData()}
    resolved={MyComponent}
    rejected={MyErrorScreen}
    pending={MyLoadingSpinner}
  />
)
```

Advanced example:

```javascript
import PromiseComponent from 'promise-react-component';
// ...

return (
  <PromiseComponent
    promise={myApi.fetchData()}
    resolved={props =>
      props.route === '/some-route'
        ? <Some {...props} />
        : <Other {...props} />
      }
    rejected={error =>
      error.status === '404'
        ? <MyNotFoundScreen />
        : <MyErrorScreen>
      }
    pending={MyLoadingSpinner}
  />
)
```

** Note: All props are optional **
