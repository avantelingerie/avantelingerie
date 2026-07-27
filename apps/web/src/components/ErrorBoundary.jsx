import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('🔴 ErrorBoundary caught an error:', error);
    console.error('🔴 Error details:', errorInfo);
    console.error('🔴 Component stack:', errorInfo.componentStack);
    
    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-card border border-destructive/20 rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-destructive/10 p-6 border-b border-destructive/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Erro no Painel Admin</h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    Algo deu errado ao carregar esta página
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-muted/30 rounded-lg p-4 border">
                <p className="text-sm font-medium text-foreground mb-2">Mensagem de Erro:</p>
                <p className="text-sm text-destructive font-mono">
                  {this.state.error?.toString() || 'Erro desconhecido'}
                </p>
              </div>

              {this.state.errorInfo && (
                <details className="bg-muted/30 rounded-lg p-4 border">
                  <summary className="text-sm font-medium text-foreground cursor-pointer hover:text-primary">
                    Detalhes Técnicos (clique para expandir)
                  </summary>
                  <pre className="text-xs text-muted-foreground mt-3 overflow-x-auto whitespace-pre-wrap font-mono">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}

              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-lg p-4">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>Dica de Debug:</strong> Abra o Console do Navegador (F12) para ver logs detalhados do erro.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button 
                  onClick={this.handleReset}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Recarregar Página
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = '/admin'}
                  className="flex-1"
                >
                  Voltar ao Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;