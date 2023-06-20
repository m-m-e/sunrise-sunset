export interface ApiResponse {
  results: {
    [label: string]: string,
  },
  status: string
}